const assert = require('chai').assert;
const chai = require('chai');
const mocha = require('mocha');
const server = require('../app2')
const chaiHttp = require('chai-http');
const { dbFunction } = require("../allFunction");
const client = require('../db');

const DBFunction = new dbFunction();
chai.should();
chai.use(chaiHttp);
 describe('Task API',() => {
    const newData = {
        name : "Albanero_Chanda",
        course: "SDP program",
        yearOfProgram :2021,
    };
     //test for get routes
     describe('Get /', () => {
         it('it should get all the database details',async()=>{
            const res = await chai.request(server).get("/");
            res.should.have.status(200);
            //res.body.should.be.a('array');
         });
        it('it should not get all the user',async() => {
            const res = await chai.request(server).get("/");
            res.should.have.status(200);
        });
    });
    describe('Get /user/:username',()=>{
        it('it should get all the details of this username',async() => {
            const res = await chai.request(server).get("/api/user/kiran beniwal");
            //console.log(res);
            res.should.have.status(200);

        })
        it('it should not get all the details of this username',async() => {
            const res = await chai.request(server).get("/api/user/kiran");
            res.should.have.status(200);
        })
    });
    describe('POST /',()=>{
        it("it should add a new database",async()=>{
            const res = await chai.request(server).post('/api/user').send(newData);
            res.should.have.status(201);
        })
        it("it should not add a new database",async()=>{
            const res = await chai.request(server).post('/api/user').send(newData);
            res.should.have.status(400);
        })
    })
    describe('PUT /:username',()=>{
        const task={
            name : "chandakumari"
        }
        it("it should update a new database",async()=>{
            const res = await chai.request(server).put('/api/user/chandakumariCSE').send(task);
            res.should.have.status(201);
        })
        it("it should not update a new database",async()=>{
            const res = await chai.request(server).put('/api/user/chandakumariCSE').send(task);
            res.should.have.status(400);
        })
    })
    describe('DELETE /:username',()=>{
        it("it should delete this new database",async()=>{
            const res = await chai.request(server).delete('/api/user/khushi');
            res.should.have.status(200);
        })

    })

});
