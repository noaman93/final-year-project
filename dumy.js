var mongoose = require("mongoose");
//Schama setup
var blogSchema = new mongoose.Schema({
    title:String,
    created:{type : Date, default : Date.now},
    description:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

module.exports = mongoose.model("Blog",campgroundSchema);