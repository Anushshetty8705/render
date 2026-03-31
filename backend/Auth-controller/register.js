const connectDB= require("../db");
const express= require("express");
const router= express.Router();
const bcrypt= require("bcryptjs");
const { v4: uuidv4 } = require('uuid');

router.post("/register",async (req,res) =>{
    try{
        const db =await connectDB();
        const {name,email,password}= req.body;
        if(!name || !email || !password){
            return res.status(400).json({success:false, message:"All fields are required"});
        }
     const existingUser= await db.collection("users").findOne({email});
        if(existingUser){
            return res.status(400).json({success:false, message:"Email already registered"});
        }
        const hashedPassword= await bcrypt.hash(password,10);
        const newUser={
            id: uuidv4(),
            name,
            email,
            password: hashedPassword,
            createdAt: new Date()
        }
        await db.collection("users").insertOne(newUser);
        return res.status(201).json({success:true, message:"User registered successfully"});


    }catch(err){
        return res.status(500).json({ success: false, error: err.message });    
    }
})
module.exports= router;
