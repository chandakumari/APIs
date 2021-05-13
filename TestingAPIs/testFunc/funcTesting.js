const assert = require('chai').assert;
const chai = require('chai');
const { expect } = require("chai");
//const mocha = require('mocha');
const chaiHttp = require('chai-http');
const { dbFunction } = require("../allFunction");
const client = require('../db');
chai.should();
chai.use(chaiHttp);
const dbname ="MyDatabase";
const collection = "user";

connect();
async function connect() {
  await client.connect();
 const db = client.db('MyDatabase');
  console.log("Connected to database " + db.databaseName);
}

const DBFunction = new dbFunction();
describe("Testing for function",()=> {
    const testData = {
        name : "swati",
        course : "btech",
        yearOfGraduation : 2021,
    }
    describe("Testing getAllColl",()=>{
        it("it should return all details of database",async()=>{
            const res = await DBFunction.getAllColl();
            res.should.be.an("array");
        });
    });
    describe("testing of FindCollByUserName",()=>{
        it("it should return all details of specific username",async()=>{
            const res = await DBFunction.FindCollByUserName('testData.name');
            res.should.be.an("array");
        });
    });
    describe("testing of addNewDetailInColl",()=>{
        it("it should add newDetail to the database",async()=>{
            const res = await DBFunction.addNewDetailInColl(testData);
            expect(res.insertedCount).to.be.eq(1);
            expect(res.result).to.have.property("ok").eq(1);
        });
    });
    describe("testing of updateUserName",()=>{
        const newName = {
            name : "swatikumari"
        }
        const userName = "swati";
        it("it should update the any username",async()=>{
            const res = await DBFunction.updateUserName(userName,newName);
            const db = client.db(dbname);
            const details = await db.collection(collection);
            const result = await details.find({ name: newName }).toArray();
            result.should.be.an("array");
        });
    });
    describe("testing of findOneAndDeleteDetails",()=>{
        it("it should delete the details of specific username",async()=>{
            await DBFunction.findOneAndDeleteDetails(testData);
            const db = client.db(dbname);
            const details = await db.collection(collection);
            const result = await details.find({ name: "swati" }).toArray();
            result.should.be.an("array");
        });
    });
});
