const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Making the schema on which we have to work 
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        // Update the image field to be an object with filename and url
        filename: { type: String, default: "listingimage" },
        url: {
            type: String,
            default: "https://www.pexels.com/photo/concrete-road-between-trees-1563356/"
        },
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
