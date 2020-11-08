const userModel = require('../models/user');
const userChatModel = require('../models/chat');


module.exports.sendChatMessage = async (data, socket, callback) => {

  console.log("CALLBACK ",callback);

  console.log("sending Chat...");
  console.log("socket of this user" + socket.id);
  // socket.emit(recieveChatMessage, data);

  var [toUserData, fromUserData] = await Promise.all([
      userModel.findOne({ _id: data.to_id }),
      userModel.findOne({ _id: socket.userData.userId })
  ]);


  var updatedChat = null;
  if (toUserData) {
      console.log("1",socket.userData.userId);
     let userChatData = await userChatModel.findOne({ $and:[{$or:[{user1:data.to_id},{user2:socket.userData.userId}], $or:[{user2:data.to_id},{user1:socket.userData.userId}]} ] });
      if (userChatData) {
          var created_at = new Date();
          var obj = {
              from: data.from,
              to: data.to,
              message: data.message,
              created_at: created_at
          };
          data.created_at = created_at;
          updatedChat = await userChatModel.updateOne({ $and:[{$or:[{user1:data.to_id},{user2:socket.userData.userId}], $or:[{user2:data.to_id},{user1:socket.userData.userId}]} ] }, {
              $set: {
                  updated_at: created_at
              },
              $push: {
                  msg_list: obj
              }
          }).exec();
      }
      else {
          var created_at = new Date();
          var obj = {
              user1:socket.userData.userId,
              user2:data.to_id,
              msg_list: [{
                  from: socket.userData.userId,
                  to: data.to_id,
                  message: data.message,
                  created_at: created_at
              }],
              created_at: created_at,
              updated_at: created_at
          };
          data.created_at = created_at;
          updatedChat = await userChatModel.create(obj).then(result => { return result }).catch(err => { console.log(err); return null; });
          // console.log(updatedChat);
      }

      console.log("2");
      if (updatedChat) {
          console.log("3");
          console.log(toUserData);
          if (toUserData.socket_status) {
              console.log("SENDING DATA to other user");
              console.log(data);
              socket.broadcast.to(toUserData.socket_id).emit("recieveChatMessage", data);
          }

          // callback({ status: true, message: "message sent successfully!" });
      }
      else {
          console.log("4");
          // callback({ status: false, message: "something went wrong!" });
      }
  }
  else {
      // callback({ status: false, message: "requested user not found!" });
  }
}
