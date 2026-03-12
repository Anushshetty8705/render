const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

const dbName = "HichhikerDB";

async function connectDB() {
  await client.connect();
  console.log("Connected to MongoDB");
  return client.db(dbName);
}

module.exports = connectDB;
