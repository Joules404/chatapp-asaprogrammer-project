const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        minlength:6,
        required:true
    },
    gender:{
        type:String,
        enum:['male','female'],
        required:true
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema)

module.exports = User