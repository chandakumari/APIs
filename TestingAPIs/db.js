const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

client = new MongoClient("mongodb://localhost:27017", { useUnifiedTopology: true });

module.exports = client;