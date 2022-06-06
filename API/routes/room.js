const express = require('express')
const {  verifyTokenAndAdminAuth } = require('../middleware/auth');
const RoomControllers = require('../controllers/roomControllers')

const router = express.Router()

// Create Room 


router.post('/:hotelid', verifyTokenAndAdminAuth, RoomControllers.createRoom)

// Update 
router.put('/availability/:id', RoomControllers.updateRoomAvailability)
router.put('/:id', verifyTokenAndAdminAuth, RoomControllers.updateRoom)

// Delete 
router.delete('/:id/:hotelid', verifyTokenAndAdminAuth,RoomControllers.deleteRoom)

// GET room by ID 
router.get("/:id", RoomControllers.getRoom);

// Get all room
router.get('/',RoomControllers.getRooms )

module.exports = router


