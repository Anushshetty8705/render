const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
const path = require("path");
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

// ------------------ MIDDLEWARE ------------------
app.use(express.json());

// ✅ CORS (update with your Render URL later)
app.use(
  cors({
    origin: true, // or ["http://localhost:5173", "https://your-app.onrender.com"]
    credentials: true,
  })
);

// ------------------ DB ------------------
connectDB();

// ------------------ SESSION ------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);

// ------------------ PASSPORT ------------------
app.use(passport.initialize());
app.use(passport.session());

// ------------------ ROUTES ------------------

// Social auth
app.use("/auth", require("./Social-Auth/auth"));

// Other APIs
app.use(sendotp);
app.use(verifyotp);
app.use(register);
app.use(login);
app.use(forgot_password);
app.use(update_password);

// ------------------ REACT (VITE BUILD) ------------------

// Serve React (Vite build)
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

// ✅ FIXED catch-all route (Express 5 safe)
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../Frontend/dist", "index.html"));
});

// ------------------ SERVER ------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
