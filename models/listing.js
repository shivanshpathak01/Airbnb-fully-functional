const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Making the schema on which we have to work 
const listingSchema = new Schema({
    title: {
        type : String,
        required : true
    },
    description: String,
    image: {
        type : String,
        default:"https://www.pexels.com/photo/concrete-road-between-trees-1563356/",
        set: (v)=> v ===""?"https://www.pexels.com/photo/concrete-road-between-trees-1563356/":v,      // To set default value for images we use v 
    },    
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;