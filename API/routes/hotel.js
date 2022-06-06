const express = require('express')
const { getHotelRooms } = require('../controllers/hotelControllers')
const HotelControllers = require('../controllers/hotelControllers')
const {verifyToken, verifyTokenAndAdminAuth} = require('../middleware/auth')
const router = express.Router()

// Create : 
router.post('/', verifyTokenAndAdminAuth, HotelControllers.createHotel)

// Update : 
router.put('/:id', verifyTokenAndAdminAuth, HotelControllers.updateHotel)

// Delete :
router.delete(':/id', verifyTokenAndAdminAuth, HotelControllers.deleteHotel)

// Get 
router.get('/:id', HotelControllers.getHotel)

// Get all 
router.get('/', HotelControllers.getHotels)
router.get('/countByCity', HotelControllers.countByCity)
router.get('/countByType', HotelControllers.countByType)
router.get('/room/:id',HotelControllers.getHotelRooms)

module.exports = router