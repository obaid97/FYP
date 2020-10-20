const express  = require("express");
//const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
const extractFile = require('../middleware/file');
const UserController = require("../controllers/user");
const app = express();
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const { RouteReuseStrategy } = require("@angular/router");

//const { error } = require("console");
//const user = require("../models/user");


//sign up post router
router.post("/signup",extractFile,extractFile,UserController.createUser);


//login post router
router.post("/login",UserController.userLogin);
//unverified users
router.get("/unverifiedusers",UserController.findUnverifiedUsers);
router.get("/verifiedusers",UserController.findVerifiedUsers);

//router.post("/dummy",UserController.dummy);
router.put("/approve/:cnicNumber",UserController.approveuser);
router.put("/disable/:cnicNumber",UserController.disableuser);
router.get("/userdetails/:cnicNumber",UserController.userdetails);
router.post("/delete/:cnicNumber",UserController.deleteUser);
router.get("/allusers",UserController.getallusers);
router.put("/updateuserdetails/:cnicNumber",UserController.updateuserdetails);
//router.get("/allusers",UserController.getallusers)
module.exports = router;
