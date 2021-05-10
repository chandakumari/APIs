const express = require("express");
const app = express();
app.use(express.json());

const detailsRouter = express.Router();

const { dbFunction } = require("../allFunction");

const DBFunction = new dbFunction();

// GET all details in Database
detailsRouter.get("/", async (req, res) => {
    allDetails = await DBFunction.getAllColl();
    res.status(200).json(allDetails);
});
// takes username as input and returns all users in this user's organization
detailsRouter.get("/:username", async (req, res) => {
    const username = req.params.username;
    const detail = await DBFunction.findCollByUserName(username);
    res.status(200).json(detail);
});
 
//Post Api
detailsRouter.post("/",async(req,res)=>{
    const details = req.body;
    const userName = await dbFunction.findCollByUserName(details.name);
    if(Object.keys(userName)?.length??0){
        await dbFunction.addNewDetailInColl(details);
    }else{
        const sendingMSZ = {
            message : "this username is already in exist",
        };
        res.status(400).json(sendingMSZ);
    }
});

//put api
detailsRouter.put("/:username",async(req,res)=>{
    const username = req.query.name;
    const newName = req.body;
    const userName = await dbFunction.findCollByUserName(username);
    if(Object.keys(userName)?.length??0){
        const sendMsz = {
            message : "this username is not exit",
        };
    }else{
        await dbFunction.updateUserName(newName);
        const sendMsz = {
            message : `username change to ${newName.name}`,
        };
        res.send(400).json(sendMsz);
    }
})

//delete api
detailsRouter.delete("/:username",async(req,res)=>{
    const username = req.params.username;
    const getUsername = await dbFunction.findCollByUserName(username);
    if(Object.keys(getUsername)?.length??0){
        const sendMsz = {
            message : "this username is not exist",
        };
        res.status(400).json(sendMsz);
    }else{
        await dbFunction.findOneAndDeleteDetails(getUsername);
        const sendMsz = {
            message : "All details related to this username is deleted",
        };
        res.status(400).json(sendMsz);
    }
})
module.exports = detailsRouter;
