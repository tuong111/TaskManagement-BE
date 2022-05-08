const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth')

const Post = require('../models/posts')

// @route POST api/posts
// @description Create a new post
// @access Private
router.post('/', verifyToken,async (req, res) => {
    const {title, description, url, status} = req.body

    // Simple validation
    if (!title) {
        return res.status(400).json({
            success: false,
            message: 'title is required'
        })
    }

    try {
        const newPost = new Post({
            title,
            description,
            url : url.startsWith('http://') ? url : `https://${url}`,
            user : req.userID
        })

        await newPost.save()
        res.json({
            success: true,
            message: 'Post saved successfully',
            post: newPost
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message:"Internal Server Error",
        })
    }
})

module.exports =  router