const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
const collName = process.env.COLL_NAME;
const detailsRouter = express.Router();

const { dbFunction } = require("../allFunction");

const DBFunction = new dbFunction();


detailsRouter.get("/user", async (req, res) => {
    console.log("hi");
     const allDetails = await DBFunction.getAllColl();
     res.status(200).json(allDetails);
});

detailsRouter.get("/user/:username", async (req, res) => {
    const Username = req.params.username;
    console.log(Username);
    const detail = await DBFunction.FindCollByUserName(Username);
    console.log(detail);
    res.status(200).json(detail);
});
 
//Post Api
detailsRouter.post("/user",async(req,res)=>{
    const details = req.body;
    const userName = await DBFunction.FindCollByUserName(details.name);
    console.log(details,userName);
    if(userName.length == 0){
        await DBFunction.addNewDetailInColl(details);
        res.send(201);
    }else{
        const sendingMSZ = {
            message : "this username is already in exist",
        };
        res.status(400).json(sendingMSZ);
    }
});

//put api
detailsRouter.put("/user/:username",async(req,res)=>{
    const username = req.params.username;
    const newName = req.body;
    const userName = await DBFunction.FindCollByUserName(username);
    console.log(userName);
    if(userName.length == 0){
        const sendMsz = {
            message : "this username is not exit",
        };
        res.send(400);
    }else{
        await DBFunction.updateUserName(username,newName);
        const sendMsz = {
            message : `username change to ${newName.name}`,
        };
        res.send(201).json(sendMsz);
    }
})

//delete api
detailsRouter.delete("/user/:username",async(req,res)=>{
    const username = req.params.username;
    const getUsername = await DBFunction.FindCollByUserName(username);
    if(getUsername.length == 0){
        const sendMsz = {
            message : "this username is not exist",
        };
        res.status(400).json(sendMsz);
    }else{
        await DBFunction.findOneAndDeleteDetails(username);
        const sendMsz = {
            message : "All details related to this username is deleted",
        };
        res.status(200).json(sendMsz);
    }
})
module.exports = detailsRouter;
