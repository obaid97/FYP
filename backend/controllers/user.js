const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const User = require("../models/user");
const { findOne } = require("../models/user");






exports.createUser =  (req,res,next)=>{

  const tempuserstatus = "user";
  const url = req.protocol + '://' + req.get("host");
  bcrypt.hash(req.body.password, 10)
    .then(hash =>
      {
        const user = new User({
          fullName: req.body.fullName,
          email:req.body.email,
          password:hash,
          phoneNumber:req.body.phoneNumber,
          fullAddress: req.body.fullAddress,
          cnicNumber:req.body.cnicNumber,
          dob: req.body.dob,
          genderStatus:req.body.genderStatus,
          accountStatus: tempuserstatus,
          imagePath: url+"/images/" + req.file.filename,
          //profileImage: url+"/images/" + req.file.filename,
          authorizedStatus: false
      });
      user.save().then(result =>
        {
          res.status(201).json({
            message: "User created sucesfully",
            result: result
          });
        })
          .catch(error => {
            res.status(500).json({
                message: "Invalid Authentication Credentials!"
            });
          });
  });
}


exports.userLogin= (req,res,next) =>
{
  //console.log("sucesfully");
  let fethcedUser;
  User.findOne({cnicNumber:req.body.cnicNumber})
    .then(user =>
    {
      if(!user)
      {
        return res.status(401).json(
        {
          message: "Authentication Failed"
        });
      }
      fethcedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
      .then(result =>
          {
            if(!result)
            {
              return res.status(401).json(
                {
                  message: "Invalid Authentication Credentials"
                });
            }
            //the second parameter "'secret_this_should_be_longer'" this would be changed in our real application for security purpose...and it is used in self created middleware check-auth
            const token = jwt.sign({cnicNumber: fethcedUser.cnicNumber, userId: fethcedUser._id, accountStatus: fethcedUser.accountStatus},
              process.env.JWT_KEY,
              {expiresIn: "1h"});
            res.status(200).json(
              {
                token : token,
                expiresIn: 3600,
                userId: fethcedUser._id,
                accountStatus: fethcedUser.accountStatus
                //message: "Succesfull"
              });
          })
          .catch(error =>
            {
              return res.status(401).json(
                {
                  message: "Authentication Failed"
                });
            });
    }





exports.userdetails = (req,res,next) =>
{

User.findOne({cnicNumber: req.params.cnicNumber}).then(userdetail =>{

  if(userdetail)
  {
    res.status(200).json({
      message:"Fetched sucesfully",
      result:userdetail,
      });
  }
  else
  {
    res.status(404).json({message:"error finding user"})
  }

}).catch(error =>console.log(error))
}




exports.deleteUser = (req,res,next) =>
{

  User.deleteOne({cnicNumber: req.params.cnicNumber}).then(result =>
    {
      //console.log(req.params.cnicNumber);
      if(result.n > 0)
      {
        res.status(200).json({message:"User deleted successfully"});
      }
      else
      {
        res.status(401).json({message:"error deleting user"});
      }
    }).catch(error =>{res.status(500).json({message:"error deleting user"});
  });

}




exports.findUnverifiedUsers = (req,res) =>
{

  User.find({authorizedStatus:false})
  .then(results => {

    res.status(200).json(
      {
        message:"Unverified Users Fetched Sucessfully",
        users:results

      })

    })
  .catch(error => console.error(error))

}


exports.approveuser =  (req,res,next) =>
{
const a = {"authorizedStatus": true};
  User.findOne({cnicNumber: req.params.cnicNumber}, function(err, foundobject)
  {
    //console.log(req.params.cnicNumber + " found");
    if(err)
    {
      //console.log(err);
      res.status(500).send(err.message);
    }
    else
    {
      if(!foundobject)
      {
        res.status(404).send();
      }
      else
      {
          foundobject.authorizedStatus = true;


        //can apply as many fields as we can like above

        foundobject.save(function(err,updateObject)
        {
          if(err)
          {
            console.log(err);
            res.status(500).json({ message:"Authorized Sucessfully"});
          }
          else
          {
            res.send(updateObject);
          }
        })
      }
    }
  })
}


exports.updateuserdetails =  (req,res,next) =>
{

  User.findOne({cnicNumber: req.params.cnicNumber}, function(err, foundobject)
  {
    //console.log(req.params.cnicNumber + " found");
    if(err)
    {
      console.log(err);
      res.status(500).send(err.message);
    }
    else
    {
      if(!foundobject)
      {
        res.status(404).send();
      }
      else
      {

          foundobject.email = req.body.email;


          foundobject.phoneNumber = req.body.phoneNumber;


          foundobject.fullAddress = req.body.fullAddress;

        /*if(req.body.email)
        {
          foundobject.email = req.body.email;
        }
        if(req.body.phoneNumber)
        {
          foundobject.phoneNumber = req.body.phoneNumber;
        }
        if(req.body.fullAddress)
        {
          foundobject.fullAddress = req.body.fullAddress;
        }*/
        //can apply as many fields as we can like above

        foundobject.save(function(err,updateObject)
        {
          if(err)
          {
            console.log(err);
            //res.status(500).send();
            res.status(500).json({message:"Updated Sucessfully",result:foundobject});
          }
          else
          {
            res.send(updateObject);
          }
        })
      }
    }
  })
}

exports.disableuser =  (req,res,next) =>
{
const a = {"authorizedStatus": true};
  User.findOne({cnicNumber: req.params.cnicNumber}, function(err, foundobject)
  {
    //console.log(req.params.cnicNumber + " found");
    if(err)
    {
      //console.log(err);
      res.status(500).send(err.message);
    }
    else
    {
      if(!foundobject)
      {
        res.status(404).send();
      }
      else
      {
          foundobject.authorizedStatus = false;


        //can apply as many fields as we can like above

        foundobject.save(function(err,updateObject)
        {
          if(err)
          {
            //console.log(err);
           // res.status(500).send();
            res.status(500).json({ message:"Disabled Sucessfully"});
          }
          else
          {
            res.send(updateObject);
          }
        })
      }
    }
  })
}




exports.getallusers = (req,res,next) =>
{
  User.find().then(users =>
    {
      res.status(200).json({
        message :" users fethced sucessful",
        result: users });
    })
}



/*
exports.getallusers = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const userQuery = User.find();
  let fetchedUsers;
  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  User.find()
  userQuery.then(documents => {
    fetchedUsers = documents
    return Post.count();

  }).then(count => {
    res.status(200).json(
      {
        messgae: "Users Fetched Successfully",
        users: fetchedUsers,
        maxPosts: count
      });
  }).catch(error => {
    res.status(500).json({
      message: "Fetching Users Failed!"
    })
  });
}
*/

exports.findVerifiedUsers = (req,res) =>
{

  User.find({authorizedStatus:true})
  .then(results => {

    res.status(200).json(
      {
        message:"Verified Users Fetched Sucessfully",
        users:results

      })

    })
  .catch(error => console.error(error))

}


exports.passwordrest = (req, res, next) =>
{
  bcrypt.compare(req.body.password, user.password);
  User.findOne({cnicNumber: req.params.cnicNumber}, function(err, foundobject)
  {
    if(err)
    {
      res.status(500).send(err.message);
    }
    else
    {
      if(!foundobject)
      {
        res.status(404).send();
      }
      else if(true)
      {
          foundobject.password = false;

          foundobject.save(function(err,updateObject)
        {
          if(err)
          {
            res.status(500).json({ message:"Disabled Sucessfully"});
          }
          else
          {
            res.send(updateObject);
          }
        })
      }
    }
  })}




  exports.passwordreset= (req,res,next) =>
  {
    //console.log("sucesfully");
    let fethcedUser;
    User.findOne({cnicNumber:req.body.cnicNumber})
      .then(user =>
      {
        const status = bcrypt.compare(req.body.password, user.password);
        if(!status && !user)
        {
          return res.status(401).json(
          {
            message: "Invalid password"
          });
        }
        fethcedUser = user;
        //return bcrypt.compare(req.body.password, user.password);

      })
        .then(result =>
            {
              if(!result)
              {
                return res.status(401).json(
                  {
                    message: "Invalid Authentication Credentials"
                  });
              }
              //the second parameter "'secret_this_should_be_longer'" this would be changed in our real application for security purpose...and it is used in self created middleware check-auth
              const token = jwt.sign({cnicNumber: fethcedUser.cnicNumber, userId: fethcedUser._id, accountStatus: fethcedUser.accountStatus},
                process.env.JWT_KEY,
                {expiresIn: "1h"});
              res.status(200).json(
                {
                  token : token,
                  expiresIn: 3600,
                  userId: fethcedUser._id,
                  accountStatus: fethcedUser.accountStatus
                  //message: "Succesfull"
                });
            })
            .catch(error =>
              {
                return res.status(401).json(
                  {
                    message: "Authentication Failed"
                  });
              });
      }

