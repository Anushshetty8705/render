const connectToDB = require("../db");
const express = require("express");
const router = express.Router();   
const nodemailer = require("nodemailer"); 

router.post("/forgot-password", async (req, res) =>{
    try{
         const db = await connectToDB();

  const { email } =  req.body;

   
 
    const collection = db.collection("users");

    const user = await collection.findOne({ email });

    if (!user) {
      return  res.status(400).json({ message: "User not found" });
    }


    const resetToken = user.id;
    const expiry = new Date(Date.now() + 1000 * 60 * 15);

    await collection.updateOne(
      { email },
      {
        $set: {
          resetTokenExpiry: expiry,
        },
      }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `
        <h3>Reset Your Password</h3>
        <p>Click below link to reset:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    res.send({ message: "Password reset link sent" });
        
    }catch(error){
        res.status(500).json({message:"Server error"});
    }
})
module.exports = router;