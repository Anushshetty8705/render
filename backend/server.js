const express = require('express')
const app = express()
const port = 3000

require("dotenv").config();

const cors = require('cors');
const connectDB = require("./db");

const sendotp = require("./routes/send-otp");
const verifyotp = require("./routes/verify-otp");

let db;

connectDB().then(database => {
  db = database;
});

app.use(cors());
app.use(express.json())


app.use( sendotp);
app.use( verifyotp);






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})