const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../Airbnb-fully-functional/models/listing.js");

// Connecting DB
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().
    then(()=>{
    console.log("Connected to DB");
    })
    .catch((err) =>{
    console.log(err);    
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{        // making APIs
    res.send("Hi, I am root"); 
})

app.get("/testListing",async (req,res)=>{
    let sampleListing = new Listing({
    title:"My Home",
    description: "near Railway Station",
    price: 1200,
    location: "Ayodhya",
    country: "India",
    });
    await sampleListing.save();
    console.log("Sample was saved successfully");
    res.send("Successful");
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");  
})