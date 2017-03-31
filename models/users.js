var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username : String,
    password : String,
    firstName : String,
    lastName : String,
    email : String,
    phoneNumber : Number,
    userType : String,
    properties:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Property"
        }
    ]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);