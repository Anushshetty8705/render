const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const connectDB =require("../db")

router.put("/update-password", async (req, res) => {
  try {
    const db = await connectDB();
    const { token, password } = req.body;
    if (!token || !password) {
      return res
        .status(400)
        .json({ message: "Token and password are required" });
    }
    const user = await db.collection("users").findOne({ id: token });

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    if (user.resetTokenExpiry < new Date()) {
      return res.status(400).json({ message: "Reset token expired" });
    }
    const hasspass = await bcrypt.hash(password, 10);
    await db
      .collection("users")
      .updateOne(
        { id: token },
        { $set: { password: hasspass }, $unset: { resetTokenExpiry: "" } },
      );
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
