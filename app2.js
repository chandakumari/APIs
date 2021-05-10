const express = require("express");
const dotenv = require("dotenv");
const app = express();
app.use(express.json());
dotenv.config();
//const client = require("./db");

const detailsRouter = require("./Routes/productRoutes");
app.use("/productRoutes", detailsRouter);

app.get("/",(req, res)=>{
    const sendMSZ = {
      message: "Hey everyone!",
    };
    res.status(200).json(sendMSZ);
});

// connecting to database
const dbname = process.env.DatabaseName;
connect();
async function connect() {
  await client.connect();
 // const db = client.db(dbname);
  console.log("Connected to database " + dbname);
}

app.listen(process.env.PORT, () => {
  console.log(3001);
});