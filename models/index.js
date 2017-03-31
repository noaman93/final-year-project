var mongoose = require("mongoose");

//PROPERTY SCHEMA
var propertySchema = new mongoose.Schema({
    purpose: String,
    propertyType: String,
    subType: String,
    city: String,
    location: String,
    propertyTitle: String,
    description: String,
    price: Number,
    landArea: Number,
    image: String,
//    author:{
//        id:{
//            type:mongoose.Schema.Types.ObjectId,
//            ref:"User"
//        },
//        username:String
//    },
    ownerDetails: {
        name: String,
        mobileNumber: Number,
        homeNumber: Number,
        contactEmail: String
    },
    propertyTypeDetails: {
        bedRoom: String,
        bathRoom: String,
        numberOfStories: String,
        garage: String
    },
    created : {type : Date, default : Date.now}
});

module.exports = mongoose.model("Property", propertySchema);