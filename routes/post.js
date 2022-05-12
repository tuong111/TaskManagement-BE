const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth')

const Post = require('../models/posts')
// @route GET api/posts
// @description Get post
// @access Private
router.get('/',verifyToken, async (req,res)=> {
    try {
        const posts = await Post.find({user : req.userID}).populate('user',['username'])
        res.json({
            success : true,
            posts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message:"Internal Server Error",
        })
    }
})



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

// @route PUT api/posts
// @description Update a post
// @access Private
router.put('/:id', verifyToken, async (req,res) => {
    const {title, description, url, status} = req.body
    console.log(req.body)
    // Simple validation
    if (!title) {
        return res.status(400).json({
            success: false,
            message: 'title is required'
        })
    }

    try {
        let updatedPost = {
            title,
            description: description || '',
            url : (url.startsWith('http://') ? url : `https://${url}`) || '',
            status : status ||'TOLEARN'
        }

        const postUpdateCondition = {_id : req.params.id, user:req.userID}
        updatedPost = await Post.findOneAndUpdate(postUpdateCondition,updatedPost, {new : true})

        // User not authorised to update post
        if (!updatedPost){
            return res.status(401).json({
                success : false,
                message : 'Post not found or user not authorise'
            })
        }

        res.json({
            success : true,
            message :'Exellent progress!!!',
            post : updatedPost
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message:"Internal Server Error",
        })
    }
})


// @route DELETE api/posts
// @description DELETE post
// @access Private

router.delete('/:id', verifyToken, async (req,res)=> {
    try {
        const postDeleteCondition = {_id : req.params.id, user :  req.userID}
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition)

        // user not authorised or post not found
        if (!deletedPost){
            return res.status(401).json({
                success : false,
                message : "Post not found or user not authorised"
            })
        }

        res.json({
            success : true,
            message : "Deleted Succesfully",
            post : deletedPost
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