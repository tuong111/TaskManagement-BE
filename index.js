const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const autRouter = require('./routes/auth');
const postRouter = require('./routes/post')
const userInfoRouter = require('./routes/userInfo')
require('dotenv').config()
const app = express();
app.use(express.json());
app.use(cookieParser())
app.get("/",(req,res) => res.send('hello world'));

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taskmanagement.bcpwz.mongodb.net/taskmanagement?retryWrites=true&w=majority`,
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
app.use('/api/post', postRouter)
app.use('/api/userInfo', userInfoRouter)



const PORT = 3000
app.listen(PORT,()=> console.log(`Server listening on port ${PORT}`));