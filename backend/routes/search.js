const express  = require("express");
//const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
//const { title } = require("process");
const router = express.Router();
const SearchController = require("../controllers/search");

router.get('/:searchText', SearchController.searchPosts);

module.exports = router;
