const express = require('express');
const router = express.Router()
const verifyToken = require('../middleware/auth').verifyToken
const userInfoController = require('../controllers/userInfoController')

// @route GET api/userInfo
// @description GET userInfo
// @acess Public

router.get('/',verifyToken, userInfoController.getUserInfo)

// @route POST api/userInfo
// @description Create a new userinfo
// @access Private

router.post('/', verifyToken, userInfoController.createNewUserInfo)

// @route PUT api/userInfo
// @description Update a userInfo
// @access Private

router.put('/:id',verifyToken, userInfoController.updateUserInfo)

module.exports = router