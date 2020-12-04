const express  = require("express");
//const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
const extractFile = require('../middleware/file');
const UserController = require("../controllers/user");
const app = express();
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const smartContractController = require("../controllers/smartcontract");
//const { error } = require("console");
//const user = require("../models/user");


//sign up post router
router.post("/signup",extractFile,UserController.createUser);
router.post("/createadmin",extractFile,UserController.createAdmin);

//contract
router.post("/createcontract",extractFile,smartContractController.inititatecontract);
router.get("/sellercontract/:cnicNumber",smartContractController.getallsellercontracts);
router.get("/buyercontract/:cnicNumber",smartContractController.getallbuyercontracts);
router.get("/contractdetails/:contractid",smartContractController.getcontractdetails);
//login post router
router.post("/login",UserController.userLogin);

//unverified users
router.get("/unverifiedusers",UserController.findUnverifiedUsers);
router.get("/verifiedusers",UserController.findVerifiedUsers);
router.get("/allusers",UserController.findallusers);
router.post("/accstatus",UserController.accountstatus)
router.get("/getcnicnum",UserController.getcnicNumber);
//router.post("/dummy",UserController.dummy);

//router.put("/approve/:cnicNumber",UserController.approveuser);
router.post("/approve",UserController.approveuser);
router.post("/disable",UserController.disableuser);
router.get("/userdetails",checkAuth,UserController.userdetails);
router.get("/accountdetails/:id",UserController.accountdetails);
router.post("/deleteuser",UserController.deleteUser);
//router.delete("/delete/:cnicNumber",UserController.deleteUser);
router.post("/chat",UserController.startchat);
router.post("/updateuserdetails",UserController.updateuserdetails);
router.put("/forgotpassword",UserController.forgotpassword);
router.post("/reset",UserController.resetpassword);
router.post("/mail",UserController.sendemail);
router.get("/key/:key",UserController.checkkey);




//chat app
router.get("/getChatBox/:_id",UserController.getChatBox);
router.post("/inboxmessage",UserController.inboxmessage);
module.exports = router;
