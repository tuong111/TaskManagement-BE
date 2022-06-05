const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    decription : {
        type : String,

    },
    url : {
        type : String
    },
    status : {
        type : String,
        enum : ['TO LEARN','LEARNING','LEARNED']
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }
}, {timestamps : true})

module.exports = mongoose.model('posts',PostSchema)