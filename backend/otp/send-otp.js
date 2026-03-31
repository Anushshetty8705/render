const express = require("express");
const router = express.Router();
const connectDB = require("../db");
const nodemailer = require("nodemailer");





router.post("/send-otp", async (req, res) => {
  const db = await connectDB();
  try {
    const { email } = req.body;
    if (!email) {
     return res.status(400).json({ success: false, message: "Email required" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 5 * 60 * 1000; // 5 minutes

    const otpCollection = db.collection("otp");

    // Save OTP (overwrite old)
    await otpCollection.updateOne(
      { email },
      { $set: { otp, expires } },
      { upsert: true },
    );

    // Email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    // Send Email
    await transporter.sendMail({
      from: `"XTrack OTP" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <h2>Your OTP Code</h2>
        <h1 style="color:blue">${otp}</h1>
        <p>Valid for 5 minutes.</p>
      `,
    });

    return res.status(200).json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error("Send OTP Error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});
 

module.exports = router;