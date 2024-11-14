const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../Airbnb-fully-functional/models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");    // For creating different templates and layouts  
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
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));        // to use the static files 

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

// Create Route 
app.post("/listings",async (req,res)=>{
    // let{title,description,image,price,country,location} = req.body;
    let listing = req.body.listing;
    console.log(listing);
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

// Edit Route
app.get("/listings/:id/edit", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
})

//Update Route 
app.put("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`)
})

//Delete Route
app.delete("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
    
})

// check route
app.get("/listings", async (req, res) => {
    const allListings = await listing.find({});

    // Debug each listing's image URL
    allListings.forEach(listing => {
        console.log(listing.image); // This should print the URL of each image in the console
    });

    res.render("listings/index", { allListings });
});

// sample data
app.get("/testListing", async (req, res) => {
    let sampleListing = new Listing({
        title: "Sample Listing",
        description: "A test listing with an image.",
        image: "https://via.placeholder.com/150", // Sample image URL
        price: 1200,
        location: "City",
        country: "Country"
    });
    await sampleListing.save();
    console.log("Sample listing created with image");
    res.send("Sample listing created");
});



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