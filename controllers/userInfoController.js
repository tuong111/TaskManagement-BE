const UserInfo = require('../models/userInfo')

const userInfoController = {
    getUserInfo : async (req,res) => {
        try {
            const userInfos = await UserInfo.find({user : req.userID})
            res.json({
                success : true,
                userInfos
            })
        }
        catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : 'Internal Server Error'
            })
        }
    },
    createNewUserInfo : async (req, res) => {
        const {idNo, birthday, address, phone, avatar} = req.body
    
    
        //Check for exiting User Info
        try {
            const userInfo = await UserInfo.findOne({user : req.userID})
            if (userInfo) {
                return res.status(400).json({
                    success : false,
                    message : 'UserInfo already exists'
                })
            }
            const newUserInfo = new UserInfo({
                idNo,
                birthday,
                address,
                phone,
                avatar,
                user: req.userID
            })
    
            await newUserInfo.save()
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message:"Internal Server Error",
            })
        }
    },
    updateUserInfo : async (req,res)=> {
        const {idNo, birthday, address, phone, avatar} = req.body
        try {
            let updatedUserInfo = {
                idNo,
                birthday,
                address,
                phone,
                avatar
            }
            const userInfoUpdateCondition = {_id : req.params.id, user:req.userID}
            updatedUserInfo = await UserInfo.findOneAndUpdate(userInfoUpdateCondition,updatedUserInfo, {new : true})
    
            //User not authorised to update userinfo
            if (!updatedUserInfo) {
                return res.status(401).json({
                    success : false,
                    message : 'User info not found or user not authorise'
                })
            }
    
            res.json({
                success : true,
                message : 'User Info has been Updated',
                userInfo : updatedUserInfo
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

module.exports = userInfoController;