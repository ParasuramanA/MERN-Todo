const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();


const JWT_SECRET = "minet@123"; 


router.post("/register", async (req, res) => {
    
    const { username, password } = req.body;
    
   
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "User already exists" });
    }
})

router.post("/login", async (req, res) => {
    const {username,password} = req.body;
    const user = await User.findOne({username})
    if(!user) return res.status(400).json({error:"Invalid credentials"})
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) return res.status(400).json({error:"Invalid credentials"})

    const token = jwt.sign({id:user._id},JWT_SECRET,{expiresIn:"1hr"})
    res.json({token})
})

module.exports = router;