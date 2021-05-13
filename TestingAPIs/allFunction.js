const client = require("./db");
// connect();
// async function connect() {
//   await client.connect();
// }
class dbFunction{
    constructor(){
        this.dbname = "MyDatabase";
        this.collection = "user";
        console.log(this.dbname,this.collection);
    }
    
    async getAllColl(){
        const db = await client.db(this.dbname);
        const result = await db.collection(this.collection).find({}).toArray();
        //console.log(result);
        return result;
    }
    async FindCollByUserName(userName){
        const db = client.db(this.dbname);
        const details = await db.collection(this.collection);
        const result = await details.find({ name: userName}).toArray();
        //console.log(result);
        return result;
    }
    async addNewDetailInColl(newDetails){
        const db = client.db(this.dbname);
        const details =await db.collection(this.collection);
        const insertNewDetails = await details.insertOne(newDetails);
        console.log(insertNewDetails);
        return insertNewDetails;
    }
    async updateUserName(nameOfListing,updatedOfListing){
        const db = client.db(this.dbname);
        const details = await db.collection(this.collection);
        await details.updateOne({ name: nameOfListing }, { $set: updatedOfListing });
    }
    async findOneAndDeleteDetails(nameOfDeleting) {
        const db = client.db(this.dbname);
        const details = await db.collection(this.collection);
        await details.findOneAndDelete({name:nameOfDeleting});
    }
    
}
// const newDet = {
//     name : "manu",
//     course : "Btech",
//     yearOfGraduation: 2021,
// }

// const newObj = new dbFunction();
// newObj.addNewDetailInColl(newDet);
module.exports = { dbFunction };