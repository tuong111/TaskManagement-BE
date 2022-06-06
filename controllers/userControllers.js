const UserModel = require('../models/user')

const UserControllers = {
    updateUser :  async (req,res)=>{
        try {
          const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
          );
          res.status(200).json(updatedUser);
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : 'Internal Server Error'
            })
        }
      },
    deleteUser : async (req,res,next)=>{
        try {
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("User has been deleted.");
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : 'Internal Server Error'
            })
        }
      },
    getUser : async (req,res,next)=>{
        try {
          const user = await User.findById(req.params.id);
          res.status(200).json(user);
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : 'Internal Server Error'
            })
        }
      },
    getUsers : async (req,res,next)=>{
        try {
          const users = await User.find();
          res.status(200).json(users);
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success : false,
                message : 'Internal Server Error'
            })
        }
      }
}

module.exports = UserControllers;