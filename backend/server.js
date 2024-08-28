const express = require("express")
const dotenv = require("dotenv")
const path = require("path")

const authRoutes = require("./routes/auth.routes")
const connectToDB = require("./db/connectToMongoDB")

const PORT = process.env.PORT || 5000
const app = express()

dotenv.config({
    path: path.join(__dirname,'..','.env'),
    debug: true
})

app.use(express.json())

app.use("/api/auth",authRoutes)




app.listen(PORT,()=>{
    connectToDB()
    console.log(`Server listening on port ${PORT}`)
})