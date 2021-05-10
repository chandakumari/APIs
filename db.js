const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

client = new MongoClient(process.env.uri, { useUnifiedTopology: true });

module.exports = client;