const client = require("./db");

class dbFunction{
    constructor(){
        this.dbname = process.env.DatabaseName;
        this.collection = process.env.dbCollectionName;
    }
    async getAllColl(){
        const db = client.db(this.dbname);
        const result = await db.collection(this.collection).find({}).toArray();
        return result;
    }
    async FindCollByUserName(userName){
        const db = client.db(this.dbname);
        const details = await db.collection(this.collection);
        const result = await details.find({ username: userName}).toArray();
        return result;
    }
    async addNewDetailInColl(newDetails){
        const db = client.db(this.dbname);
        const details =await db.collection(this.collection);
        const insertNewDetails = await details.insertOne(newDetails);
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
        await details.findOneAndDelete(nameOfDeleting);
    }
    
}
module.exports = { dbFunction };