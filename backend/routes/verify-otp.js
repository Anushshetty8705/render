const express = require("express");
const router = express.Router();

const connectDB = require("../db");


router.post("/verify-otp", async (req, res) => {
  try {
     const db = await connectDB();
    const { email, otp } = req.body;

    const otpCollection = db.collection("otp");

    const record = await otpCollection.findOne({ email });

    if (!record) {
     return res.status(400).json({ success: false, message: "No OTP found for this email" });
    }

    if (record.expires < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    if (record.otp !==  String(otp)) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // ✅ Delete OTP after success
    await otpCollection.deleteOne({ email });

   res.status(200).json({ success: true, message: "OTP verified" });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
