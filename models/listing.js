const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Making the schema on which we have to work 
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image:{
        type:String,
        set:(v) => v === ""? "https://plus.unsplash.com/premium_photo-1687960116228-13d383d20188?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    },
    // image: {
    //     // Update the image field to be an object with filename and url
    //     filename: { type: String, default: "listingimage" },
    //     url: {
    //         type: String,
    //         default: "https://www.pexels.com/photo/concrete-road-between-trees-1563356/"
    //     },
    // },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
