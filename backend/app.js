
//latest project
const express = require('express');
const bodyparser = require("body-parser");
const path = require('path');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
//newProjectRoot
const User = require("./models/user");

const postsRoutes = require("./routes/posts");
// const searchRoutes = require("./routes/search");
const mongoose = require("mongoose");
const { json } = require('body-parser');
const userRoutes = require('./routes/user');


//resmongo "mongodb+srv://cluster0.lz7af.mongodb.net/<dbname>" --username muzammil
//mongoose.connect("mongodb+srv://muzammil:leomuzi6858@cluster0.lz7af.mongodb.net/node-angular?retryWrites=true&w=majority")
const db = mongoose.connect(
  "mongodb+srv://muzammil:"+
  process.env.MONGO_ATLAS_PW +
    "@cluster0.lz7af.mongodb.net/node-angular")
.then(() => {
  console.log("connected to Database");

})
.catch(() => {
  console.log("connection failed");

});


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));
app.use("/userimages", express.static(path.join("backend/userimages")));


app.get('/', (req, res) => res.send('hello!'));
io.on('connection', (socket) => {
  //console.log('a user connected');
  socket.on('message', (msg) => {
    //console.log(msg);
    socket.broadcast.emit('message-broadcast', msg);
   });
});




http.listen(5000, () => {
  console.log('listening on *5000');
});





//this method app.use futher helps us in CORS error the cross platform resource sharing error that occurs when we are using angualar and node on different servers.
//set geaders allow the node to view which thigs (methods) to have access to this node work
//You can change,update,remove eberythings according to you need in the second options after comma in each statemetn
//before comma are must
app.use((req,res,next)=>
{
  //req.setHeader()

  //res.setHeader("Access-Control-Allow-Origin", "*");

  //res.setHeader("Access-Control-Allow-Headers","*");

 // res.setHeader("Access-Control-Allow-Methods","*");

 res.setHeader("Access-Control-Allow-Origin", "*",);

  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-with, Content-Type, Accept, Authorization, X-Requested-With,*");

  res.setHeader("Access-Control-Allow-Methods",
  "GET,POST,PATCH,PUT,DELETE,OPTIONS,delete,deleteOne,*");

  next();

});

app.use("/api/posts",postsRoutes);
app.use("/api/user",userRoutes);
// app.use("/api/search",searchRoutes);



//This will be used to send post(store post) in database
//To get from angular side and post it on node side
  module.exports = app;
