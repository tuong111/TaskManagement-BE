const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserInfoSchema = new Schema({
    idNo : {
        type : Number,
        minlength : 9,
        maxlength : 12
    },
    fullname : {
        type : String
    },
    birthday : {
        type : String
    },
    address : {
        type : String
    },
    phone : {
        type : Number
    },
    avatar : {
        type : String
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }
}, {timestamps : true})

module.exports = mongoose.model('userInfos', UserInfoSchema)