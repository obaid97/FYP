const express  = require("express");
//const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
//const { title } = require("process");
const router = express.Router();
const PostController = require("../controllers/posts");
const SearchController = require("../controllers/posts");





router.post("",checkAuth,  extractFile ,PostController.createPost);

router.get('/',PostController.getPosts);

//router.patch can also be used to patch only updated data and put can be used to full change data

router.put("/:id",checkAuth,extractFile,PostController.updatePost);

router.get('/:id',PostController.getPost);
router.get('/search/:searchText', SearchController.searchPosts);
router.delete("/:id",checkAuth,PostController.deletePost);

module.exports = router;
