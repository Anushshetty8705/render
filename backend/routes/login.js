const connectDB = require("../db");
const express = require('express');
const router = express.Router(); 
const bcrypt= require("bcryptjs");


router.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"Email and password are required"});
        }  
        const db = await connectDB();
        const user = await db.collection("users").findOne({email});

        if(!user){
            return res.status(400).json({message:"USER NOT FOUND"});
        }
       const passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(400).json({message:"INVALID PASSWORD"});
        }
        res.json({message:"Login successful"});
    }catch(error){
        res.status(500).json({message:"Server error"});
    }

})
module.exports = router;