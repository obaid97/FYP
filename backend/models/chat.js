const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
  //title = name

  //basic car info
  portno: { type:Number, required:true},
  sendercnicNumber: { type:Number, required:true },
  recievercnicNumber: { type:Number, required:true},
  message:{type:String, required:true}
});


module.exports = mongoose.model('chat',chatSchema);
