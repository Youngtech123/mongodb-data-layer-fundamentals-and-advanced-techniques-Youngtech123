const mongoose = require('mongoose'); // using the normal js format 
require('dotenv').config() 

// create a global variable 
const uri = process.env.MONGO_URI

async function connectDB(){
    try{
        await mongoose.connect(uri)
        console.log("connection established")
    }
    catch(error){
        console.error("connection failed",error)
    }
} 

connectDB() 
module.exports = connectDB;