const Post = require('../models/post');
//const multer = require('multer');
const checkAuth = require('../middleware/check-auth');



exports.deletePost = (req, res, next) => {
  //console.log(req.params.id);
  //to check it in console
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      //console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Post Deleted Sucessfully!" });
      }
      else {
        res.status(401).json({ message: "Not Authorized!" });
      }

    }).catch(error => {
      res.status(500).json({
        message: "Deleting Post Failed!"
      });
    });
}


//createpost
exports.createPost = (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
    //basic car info
    city: req.body.city,
    make: req.body.make,
    model: req.body.model,
    registrationcity: req.body.registrationcity,
    mileage: req.body.mileage,
    exteriorcolor: req.body.exteriorcolor,
    description: req.body.description,

    //price
    price: req.body.price,

    //images
    imagePath: url + "/images/" + req.file.filename,

    //addition information
    enginetype: req.body.enginetype,
    enginecapacity: req.body.enginecapacity,
    transmission: req.body.transmission,
    assembly: req.body.assembly,
    features: req.body.features,

    //contact authInformation
    mobilenumber: req.body.mobilenumber,
    /*
    title:req.body.title,
    model:req.body.model,
    engine:req.body.engine,
    location:req.body.location,
    content:req.body.content,
    */


    creator: req.userData.userId
  });


  post.save().then(createdPost => {

    res.status(201).json({
      messgae: "Post Added Sucessfully",


      post:
      {
        ...createdPost,
        id: createdPost._id,
      }
    });
  }).catch(error => {
    res.status(500).json({
      messgae: "Creating Post Failed!"
    });
  });
}


//update post

exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const post = new Post(
    {
      _id: req.body.id,
      city: req.body.city,
      make: req.body.make,
      model: req.body.model,
      registrationcity: req.body.registrationcity,
      mileage: req.body.mileage,
      exteriorcolor: req.body.exteriorcolor,
      description: req.body.description,
      price: req.body.price,
      imagePath: imagePath,
      enginetype: req.body.enginetype,
      enginecapacity: req.body.enginecapacity,
      transmission: req.body.transmission,
      assembly: req.body.assembly,
      features: req.body.features,
      mobilenumber: req.body.mobilenumber,
      creator: req.userData.userId
    });

  //console.log(post);
  Post.updateOne(
    {
      _id: req.params.id,
      creator: req.userData.userId
    },
    post).then(result => {
      //console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "update successfull!" });
      }
      else {
        res.status(401).json({ message: "Not Authorized" });
      }

    }).catch(error => {
      res.status(500).json(
        {
          message: "Couldn't Update Post "
        });
    });
}

//fetch single post
exports.getPost = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    //console.log(post);
    if (post) {
      res.status(200).json(post);
    }
    else {
      res.status(404).json({ message: 'Post not Found!' });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching Post Failed!"
    });
  });
}

//fetch all posts
exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  Post.find()
  postQuery.then(documents => {
    fetchedPosts = documents
    return Post.count();

  }).then(count => {
    res.status(200).json(
      {
        messgae: "Posts Fetched Successfully",
        posts: fetchedPosts,
        maxPosts: count
      });
  }).catch(error => {
    res.status(500).json({
      message: "Fetching Post Failed!"
    })
  });
}

exports.searchPosts = (req, res, next) => {
  // console.log("Params: ", req.params.searchText);
  // res.send("Called successfully frpmpostss.");

  // Post.find({ "$text" : { "$search" : req.params.searchText } }).then(documents => {

  Post.find({ city: req.params.searchText }).then(documents => {
    fetchedPosts = documents
    return Post.count();

  }).then(count => {
    res.status(200).json(
      {
        messgae: "Posts Fetched Successfully",
        posts: fetchedPosts,
        maxPosts: count
      });
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: "Fetching Post Failed!"
    })
  });
}

    //fetch all posts
