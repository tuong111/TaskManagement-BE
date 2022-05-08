const express = require('express');
const mongoose = require('mongoose');
const autRouter = require('./routes/auth');
const postRouter = require('./routes/post')
require('dotenv').config()
const app = express();
app.use(express.json());
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



const PORT = 5000
app.listen(PORT,()=> console.log(`Server listening on port ${PORT}`));