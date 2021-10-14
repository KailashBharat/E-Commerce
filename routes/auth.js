const express = require("express")
const router = express.Router()

const {register, login} = require("../controllers/auth")
const {authorized} = require("../utils/requireLogin")

router.get("/register", register)
router.get("/login", login)
router.get("/private", authorized, (req,res)=>{res.json({msg:"This is the private route", user: req.user})})

module.exports = router