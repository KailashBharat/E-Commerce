require("dotenv").config()
const db = require('../db/connection')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const {JWT_SECRET} = process.env

exports.register = async (req,res)=>{
    const {fName, lName, password, age, email, interests} = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        await db.query("INSERT INTO people(first_name, last_name, password, age, email, interests) VALUES($1, $2, $3, $4, $5, $6)", [fName, lName, hashedPassword, age, email, interests])
        res.json("Succesfully created profile")
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.login = async (req, res) =>{
    const {email , password} = req.body
    try {
        const {rows} = await db.query("SELECT password, user_id FROM people WHERE email = $1", [email])
        const isValid = await bcrypt.compare(password, rows[0].password)
        
        if(!isValid){
            return res.status(401).json("Please enter valid credentials")
        }

        const token = jwt.sign({id: rows[0].user_id}, JWT_SECRET)
        res.json({token})
    } catch (error) {
        res.status(500).json(error)
    }
}
