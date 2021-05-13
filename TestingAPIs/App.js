const express = require("express");
const app = express();
app.use(express.json());
const client = require("./db");
const detailsRouter = require("./Routes/productRoutes");
app.use('/api',detailsRouter);

app.get("/",(req, res)=>{
    const sendMSZ = {
      message: "Hey everyone!",
    };
    res.status(200).json(sendMSZ);
});
connect();
async function connect() {
  await client.connect();
 const db = client.db('MyDatabase');
  console.log("Connected to database " + db.databaseName);
}

 const server = app.listen(3001,()=>{
   console.log(3001);
 });
 module.exports = server;