const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const autRouter = require('./routes/auth');
const hotelRouter = require('./routes/hotel');
const roomRouter = require('./routes/room');
const userRouter = require('./routes/user')
require('dotenv').config()
const app = express();
app.use(express.json());
app.use(cookieParser())
app.get("/",(req,res) => res.send('Booking App API'));

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taskmanagement.bcpwz.mongodb.net/bookingapp?retryWrites=true&w=majority`,
        {
            useNewUrlParser :true,
            useUnifiedTopology: true
        })

        console.log('MongDB connected')
    }
    catch (err){
        console.log(err.message)
        process.exit(1)
    }
}
connectDB()

app.use('/api/auth', autRouter)
app.use('/api/hotel', hotelRouter )
app.use('/api/room',roomRouter)
app.use('/api/user', userRouter)



const PORT = process.env.PORT || 3000
app.listen(PORT,()=> console.log(`Server listening on port ${PORT}`));