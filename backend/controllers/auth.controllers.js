// const { error, profile } = require("console")
const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const generateTokenAndSetCookie = require("../utils/generateToken")

const loginUser = async (req,res) =>{

  try{
    const {username,password} = req.body
    const user = await User.findOne({username})
    const isPasswordCorrect = await bcrypt.compare(password,user?.password||"")

    if(!user || !isPasswordCorrect){
        return res.status(404).json({error: "Invalid username or password"})
    }

    generateTokenAndSetCookie(user._id,res)
    res.status(200).json({
        _id:user._id,
        fullName:user.fullName,
        username:user.username,
        profilePic:user.profilePic
    })
  }catch(error){
    console.log("error in the login controller")
    res.status(500).json({error:"internal server error"})
  }
}


const logOutUser = (req,res) =>{
    try{
        res.cookie("jwt","",{
            maxAge:0
        })
        res.status(200).json({message:"successfully logged out"})
    }catch(error){
        console.log("Error found in the logout controller",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}



const signUpUser = async (req,res) =>{
    try{
        const {fullName,username,password,confirmPassword,gender} = req.body
        if(password != confirmPassword){
            return res.status(404).json({error:"Passwords do not match"})
        }
        const user = await User.findOne({username}) //true if user exists, false otherwise

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        if(user){
            res.status(400).json({error:`${username} already exists`})
        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender == "male" ? boyProfilePic : girlProfilePic
        })
        if(newUser){
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save()
            res.status(201).json({
                _id:newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        }else{
            res.status(404).json({error:"Invalid User Data"})
        }

    }catch(error){
        console.log(error.message)
        res.status(500).json({error: `${error}`})
    } 
}

module.exports = {loginUser,logOutUser,signUpUser}
