var express = require("express");
var router  = express.Router();
var Property = require("../models/index.js");
var MongoClient = require('mongodb').MongoClient;
var middleware  = require("../middleware/middleware.js");
var User = require("../models/users.js");
var multer = require('multer');


var storage =   multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var upload = multer({ storage : storage}).any();

//INDEX ROUTE
router.get("/",function(req,res){
    var title = "Makaan.com";
    Property.find({},function(err,found){
        if(err){
            console.log(err);
        } else {
//            console.log(req.user);
            
            
            res.render("index", {property: found, title: title});
        }
    });
});

//RENDER NEW PROPERTY FORM
router.get("/property/new", middleware.isLoggedIn, function(req,res){
    var title = "Create New Property";
    res.render("new-property", {title: title});
});


//CREATE NEW PROPERTY
router.post("/property", function(req,res){
//    console.log(req.body.property);
    
    upload(req,res,function(err) {
        if(err) {
//          Comment  return res.send("Error uploading file.");
            return res.send(err);
        }
        //IN case single upload image method
//        var image = "/uploads/" + req.file.filename;
//        req.body.property.image = image;
        
        //In multiple image Multer method
        var i =0;
        var image = [];
        req.files.forEach(function(one){
//            console.log(one);
//            console.log(one.filename);
            image[i] = "/uploads/" + one.filename;
            i++;
        });
//        console.log(image); show the array of all uploaded images
        req.body.property.image = image;

//        console.log(req.body.property);
       Property.create(req.body.property,function(err,newlyCreated){
        if(err){
            console.log(err);
        } else {
            User.findById(req.user._id, function(err,foundUser){
                if(err){
                    console.log(err);
                } else {
                    foundUser.properties.push(newlyCreated);
                    foundUser.save();
                   console.log(newlyCreated);
//                   Comment console.log(foundUser);
                }
            });
            res.redirect("/profile");        
            }
        });
     });//upload function
});

//SEARCH THE PROPERTY
router.get("/search", function(req,res){
    MongoClient.connect('mongodb://localhost:27017/real-estate', function(err, db){
        console.log("Successfully connected to MongoDB.");
    
        var title = "Search-Result";
        var notFound;
//            console.log(req.query.purpose);
//            console.log(req.query.city);
//            console.log(req.query.type);
//            console.log(req.query.price);
//            console.log(req.query.but);
//SETTING THE VALUE OF req.query.type if RADIO BUTTON PLOT OR HOSTEL IS SELECTED
        if(req.query.but == "plot"){
            var queryType = req.query.but;
            req.query.type = queryType;
        }
        if(req.query.but == "hostel"){
            var queryType = req.query.but;
            req.query.type = queryType;
        }
//        console.log(req.query.type);
        
//QUERY BUILDING
            var query={};
        
            if(req.query.purpose){
                query.purpose= req.query.purpose;
            }

            if(req.query.city){
                query.city = req.query.city;
            }
            
            if(req.query.price){
                var val = Number(req.query.price);
                query.price = { $lte : val} ;
//                query.price = req.query.price;
            }
            if(req.query.landArea){
                query.landArea = req.query.landArea;
            }
//If Plots or Hostels selected then make purpose to  null
        if(req.query.type == "plot" || req.query.type == "hostel"){
            //deletes key named purpose from our query object
            delete query.purpose;
        }

//HANDLING SUB TYPE LOGIC
        if(req.query.type){
            if(req.query.type == "shop" || req.query.type == "office" || req.query.type == "plaza" || req.query.type == "factory"){
                query.subType = req.query.type;
            } else {
                query.propertyType = req.query.type;
            }
        }
//            res.send(query);
              console.log(query);
        db.collection("properties").find(query).toArray(function(err,docs){
            if(err){
                console.log(err);
            } else {
                if(docs.length == 0){
                     notFound = "Currently no listed property matches your search parameters";
                }
//                console.log(notFound);
//                res.send(docs);
                res.render("search-result",{ notFound: notFound, property:docs, title:title, purpose:req.query.purpose, city:req.query.city, type:req.query.type, price:req.query.price, landArea: req.query.landArea});
            }
            
            
        });
    });
});

//Render search-result page
router.get("/search-result", function(req,res){
    res.render("search-result");
});


//======================
//    Property Details
//======================
router.get("/property/:id", function(req,res){
    var title = "Property Details";
    Property.findById(req.params.id , function(err, found){
        if(err){
            console.log(err);
        } else {
//            console.log(found);
         res.render("property-details", {title: title, property: found});   
        }
    });
    
});

//====================
//    Profile Routes
//====================

router.get("/profile", function(req,res){
    var message;
    User.findById(req.user._id).populate("properties").exec(function(err,foundUser){
        if(err){
            console.log(err);
        } else {
//            console.log(foundUser);
            if(foundUser.properties.length == 0){
                message = "You have post zero properties. To add new property click ADD PROPERTY button";
            }
            res.render("profile", {message: message, title: req.user.username, user: foundUser, nameOfUser: req.user.username.toUpperCase()});
        }
    });
    
});

//My properties on profile page
router.get("/profile/my-properties", function(req,res){
    var message;
    User.findById(req.user._id).populate("properties").exec(function(err,foundUser){
        if(err){
            console.log(err);
        } else {
//            console.log(foundUser);
            if(foundUser.properties.length == 0){
                message = "You have post zero properties. <br> To add new property click ADD PROPERTY button";
            }
            res.render("profile", {message: message, title: req.user.username, user: foundUser, nameOfUser: req.user.username.toUpperCase()});
        }
    });
});

//Edit Profile page
router.get("/profile/:id/edit", function(req,res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            res.render("edit-profile",{title: foundUser.username, user: foundUser});   
        }
    });
    
});

//Edit PUT Request
router.put("/profile/:id", function(req,res){
    var val = {userType: req.body.userType,
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                phoneNumber : req.body.phoneNumber
               }
    User.findByIdAndUpdate(req.params.id, val , function(err, updatedUser){
        if(err){
            console.log(err);
        } else {
            console.log(updatedUser);
            res.redirect("/profile/" + updatedUser._id + "/edit");
        }
    });
//    res.send("You hit PUT");
});
































module.exports = router;