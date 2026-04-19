const express = require('express');
const app = express();
require("dotenv").config();

const cors = require('cors');
const path = require("path"); // ✅ FIXED
const connectDB = require("./db");

const sendotp = require("./otp/send-otp");
const verifyotp = require("./otp/verify-otp");
const register = require("./Auth-controller/register");
const login = require("./Auth-controller/login");
const forgot_password = require("./Auth-controller/forgot-password");
const update_password = require("./Auth-controller/update-password");

require("./config/passport");
const session = require("express-session");
const passport = require("passport");

app.use(express.json());

// ✅ Better CORS (works locally + production)
app.use(cors({
  origin: true,
  credentials: true
}));

// DB connection
connectDB();

// Sessions + passport
app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use("/auth", require("./Social-Auth/auth"));
app.use(sendotp);
app.use(verifyotp);
app.use(register);
app.use(login);
app.use(forgot_password);
app.use(update_password);

// ✅ Serve React build (AFTER routes)
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// ✅ Dynamic port for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});