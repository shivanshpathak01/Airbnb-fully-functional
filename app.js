const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../Airbnb-fully-functional/models/listing.js");
const path = require("path");

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

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended: true}));  // So that the data get parsed

app.get("/",(req,res)=>{        // making APIs
    res.send("Hi, I am root"); 
})

// Index Route 
app.get("/listings",async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings})
})

// New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})

// Show Route 
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})


// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//     title:"My Home",
//     description: "near Railway Station",
//     price: 1200,
//     location: "Ayodhya",
//     country: "India",
//     });
//     await sampleListing.save();
//     console.log("Sample was saved successfully");
//     res.send("Successful");
// });

app.listen(8080,()=>{
    console.log("server is listening to port 8080");  
})