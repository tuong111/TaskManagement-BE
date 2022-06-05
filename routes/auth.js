const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const { verifyToken } = require('../middleware/auth');

// @route POST api/ath/register
// @desc Register user
// @access Public

router.post('/register', authController.registerUser)

// @route POST api/ath/login
// @desc Login user
// @access Public
router.post('/login', authController.loginUser)

// REFRESH TOKEN
router.post('/refresh', authController.requestRefreshToken)

// LOG OUT 
// LOG OUT 
router.post('/logout',verifyToken , authController.userLogout)

module.exports = router