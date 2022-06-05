const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth').verifyToken
const PostController = require('../controllers/postControllers')
// @route GET api/posts
// @description Get post
// @access Private
router.get('/',verifyToken, PostController.getPost)


// @route POST api/posts
// @description Create a new post
// @access Private
router.post('/', verifyToken, PostController.createNewPost)

// @route PUT api/posts
// @description Update a post
// @access Private
router.put('/:id', verifyToken, PostController.updatePost)


// @route DELETE api/posts
// @description DELETE post
// @access Private

router.delete('/:id', verifyToken, PostController.deletePost)
module.exports =  router