const express = require('express')
const UserControllers = require('../controllers/userControllers')
const {verifyToken, verifyTokenAndAdminAuth} = require('../middleware/auth')

const router = express.Router()

// Update 
router.post('/:id', verifyToken, UserControllers.updateUser)
// delete 
router.delete('/:id', verifyToken, UserControllers.deleteUser)
// Get 
router.get('/:id', verifyToken, UserControllers.getUser)
//  Get all 
router.get('/', verifyTokenAndAdminAuth, UserControllers.getUsers)

module.exports = router;