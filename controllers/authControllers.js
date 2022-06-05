const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const User = require('../models/user')

const authController = {
    registerUser : async (req,res) => {
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
            res.json({
                success: true,
                message:"User created successfully",
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message:"Internal Server Error",
            })
        }
    },
    // GENERATE ACCESS TOKEN : 
    generateAccessToken:  (user) => {
        return jwt.sign({
            userID : user._id,
            admin : user.admin
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : "30s"}
        )
    },
    // GENERATE REFRESH TOKEN :
    generateRefreshToken:  (user) => {
        return jwt.sign({
            userID : user._id,
            admin : user.admin
        },
        process.env.JWT_REFRESH_KEY,
        {expiresIn : "365d"}
        )
    },
    loginUser : async (req, res) => {
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
            const accessToken = authController.generateAccessToken(user)
            // Refresh Token 
            const refreshToken =  authController.generateRefreshToken(user)

            res.cookie("refreshToken", refreshToken, {
                httpOnly : true,
                secure : false,
                path : "/",
                sameSite : "strict"
            })

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
    },

    requestRefreshToken : async (req,res) => {
        // Take refresh token from user
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.status(401).json("You're not authenticated")
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err,user)=> {
            if (err) {
                console.log(err)
            }
            // Create new accress token , rf token
            const newAccessToken = authController.generateAccessToken(user);
            const newRfToken = authController.generateRefreshToken(user)
            res.cookie("refreshToken", newRfToken, {
                httpOnly : true,
                secure : false,
                path : "/",
                sameSite : "strict"
            })
            res.status(200),json({
                accessToken : newAccessToken
            })
        })

    }
}

//STORE TOKEN :
module.exports = authController;