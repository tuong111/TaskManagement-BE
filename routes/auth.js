const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const User = require('../models/user')

// @route POST api/ath/register
// @desc Register user
// @access Public

router.post('/register', async (req,res) => {
    const {username, password} = req.body

    // simple validation
    if (!username||!password) {
        return res.status(400).json({
            success: false,
            message: 'Missing username or password'
        })
    }
    try {
        // Check for existing username
        const user = await User.findOne({username: username})
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }

        // All good 
        const hashPassword = await argon2.hash(password)
        const newUser = new User({
            username : username,
            password : hashPassword
        })
        await newUser.save()

        // Return Token
        const accessToken = jwt.sign({
            userID : newUser._id
        },
        process.env.ACCESS_TOKEN_SECRET
        )
        res.json({
            success: true,
            message:"User created successfully",
            accessToken
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message:"Internal Server Error",
        })
    }
})

// @route POST api/ath/login
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {
    const {username,password} = req.body
    // simple validation
    if (!username||!password) {
        return res.status(400).json({
         success: false,
         message: 'Missing username or password'
            })
    }
    try {
        // Check for existing user
        const user = await User.findOne({username: username})
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect username or password'
            })
        }

        // Username found 
        const passwordValid = await argon2.verify(user.password,password)
        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect username or password'
            })
        }

        // All good 
         // Return Token
         const accessToken = jwt.sign({
            userID : user._id
        },
        process.env.ACCESS_TOKEN_SECRET
        )
        res.json({
            success: true,
            message:"Login successfully",
            accessToken
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message:"Internal Server Error",
        })
    }
})

module.exports = router