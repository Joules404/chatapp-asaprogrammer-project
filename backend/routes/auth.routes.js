const express = require("express")
const {loginUser,signUpUser,logOutUser} = require("../controllers/auth.controllers")

const router = express.Router()

router.post("/signup",signUpUser)
router.post("/login",loginUser)
router.post("/signout",logOutUser)

module.exports = router