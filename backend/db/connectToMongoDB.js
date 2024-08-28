const mongoose = require('mongoose')

const connectToDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Successfully connected to MongoDB")
    }catch(error){
        console.log(`Error attempting to connect too MongoDB: ${error}`)
    }
}

module.exports = connectToDB