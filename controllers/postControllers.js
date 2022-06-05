const postModel = require('../models/posts')

const postController = {
    getPost: async (req,res)=> {
        try {
            const posts = await postModel.find({user : req.userID}).populate('user',['username'])
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
    },
    createNewPost : async (req, res) => {
        const {title, description, url, status} = req.body
    
        // Simple validation
        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'title is required'
            })
        }
    
        try {
            const newPost = new postModel({
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
    },
    updatePost : async (req,res) => {
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
            updatedPost = await postModel.findOneAndUpdate(postUpdateCondition,updatedPost, {new : true})
    
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
    },
    deletePost : async (req,res) => {
    try {
        const postDeleteCondition = {_id : req.params.id, user :  req.userID}
        const deletedPost = await postModel.findOneAndDelete(postDeleteCondition)

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
    }

}

module.exports = postController;