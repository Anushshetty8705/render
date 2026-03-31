const express = require('express')
const app = express()
const port = 3000
require("dotenv").config();

const cors = require('cors');
const connectDB = require("./db");

const sendotp = require("./otp/send-otp");
const verifyotp = require("./otp/verify-otp");
const register =require("./Auth-controller/register");
const login = require("./Auth-controller/login");
const forgot_password = require("./Auth-controller/forgot-password");
const update_password = require("./Auth-controller/update-password");

let db;

connectDB().then(database => {
  db = database;
});
   
app.use(cors());
app.use(express.json())


app.use( sendotp);
app.use( verifyotp);
app.use( register);
app.use(login);
app.use(forgot_password);
app.use(update_password);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})