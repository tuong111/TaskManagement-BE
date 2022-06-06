const Hotel = require("../models/hotel") ;
const Room = require("../models/room") ;

const HotelControllers = {
    createHotel : async (req, res) => { 
        try {
          const {name,type,city,address,distance,desc,cheapestPrice, title} = req.body
          const newHotel = new Hotel({
          name : name,
          type : type,
          city : city,
          address : address,
          distance : distance,
          desc : desc,
          cheapestPrice : cheapestPrice,
          title : title
        })
          await newHotel.save();
          res.status(200).json({
            success: true,
            message: 'Hotel saved successfully',
            hotel: newHotel
          });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : 'Internal Server Error'
            })
        }
      },
      updateHotel : async (req, res) => {
        try {
          const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
          );
          res.status(200).json(updatedHotel);
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : 'Internal Server Error'
            })
        }
      },
      deleteHotel : async (req, res) => {
        try {
          await Hotel.findByIdAndDelete(req.params.id);
          res.status(200).json("Hotel has been deleted.");
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : 'Internal Server Error'
            })
        }
      },
      getHotel : async (req, res) => {
        try {
          const hotel = await Hotel.findById(req.params.id);
          res.status(200).json(hotel);
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : 'Internal Server Error'
            })
        }
      },
      getHotels : async (req, res) => {
        const { min, max, ...others } = req.query;
        try {
          const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min | 1, $lt: max || 999 },
          }).limit(req.query.limit);
          res.status(200).json(hotels);
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : 'Internal Server Error'
            })
        }
      },
      countByCity : async (req, res) => {
        const cities = req.query.cities.split(",");
        try {
          const list = await Promise.all(
            cities.map((city) => {
              return Hotel.countDocuments({ city: city });
            })
          );
          res.status(200).json(list);
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : 'Internal Server Error'
            })
        }
      },
      countByType : async (req, res) => {
        try {
          const hotelCount = await Hotel.countDocuments({ type: "hotel" });
          const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
          const resortCount = await Hotel.countDocuments({ type: "resort" });
          const villaCount = await Hotel.countDocuments({ type: "villa" });
          const cabinCount = await Hotel.countDocuments({ type: "cabin" });
      
          res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
          ]);
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : 'Internal Server Error'
            })
        }
      },
      getHotelRooms : async (req, res) => {
        try {
          const hotel = await Hotel.findById(req.params.id);
          const list = await Promise.all(
            hotel.rooms.map((room) => {
              return Room.findById(room);
            })
          );
          res.status(200).json(list)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : 'Internal Server Error'
            })
        }
      }
}

module.exports = HotelControllers;