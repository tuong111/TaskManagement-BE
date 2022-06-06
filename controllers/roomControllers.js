const Room = require('../models/room')
const Hotel = require("../models/hotel");

const RoomControllers = {
    createRoom :  async (req, res) => {
        const hotelId = req.params.hotelid;
        const newRoom = new Room(req.body);
        try {
          const savedRoom = await newRoom.save();
          try {
            await Hotel.findByIdAndUpdate(hotelId, {
              $push: { rooms: savedRoom._id },
            });
          } catch (err) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : 'Internal Server Error'
            })
          }
          res.status(200).json(savedRoom);
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : 'Internal Server Error'
            })
        }
    },
    updateRoom : async (req, res) => {
        try {
          const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
          );
          res.status(200).json(updatedRoom);
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : 'Internal Server Error'
            })
        }
      },
      updateRoomAvailability : async (req, res) => {
        try {
          await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
              $push: {
                "roomNumbers.$.unavailableDates": req.body.dates
              },
            }
          );
          res.status(200).json("Room status has been updated.");
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : 'Internal Server Error'
            })
        }
      },
      deleteRoom : async (req, res) => {
        const hotelId = req.params.hotelid;
        try {
          await Room.findByIdAndDelete(req.params.id);
          try {
            await Hotel.findByIdAndUpdate(hotelId, {
              $pull: { rooms: req.params.id },
            });
          } catch (err) {
            next(err);
          }
          res.status(200).json("Room has been deleted.");
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : 'Internal Server Error'
            })
        }
      },
      getRoom : async (req, res) => {
        try {
          const room = await Room.findById(req.params.id);
          res.status(200).json(room);
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : 'Internal Server Error'
            })
        }
      },
      getRooms : async (req, res) => {
        try {
          const rooms = await Room.find();
          res.status(200).json(rooms);
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : 'Internal Server Error'
            })
        }
      }
}

module.exports = RoomControllers;