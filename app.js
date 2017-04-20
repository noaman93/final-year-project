var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride  = require("method-override"),
    flash = require("connect-flash");


//DATABASE CONFIGURATION
var url = process.env.DATABASEURL || "mongodb://localhost/real-estate";
mongoose.connect(url);


//REQUIRING MODELS
var Property = require("./models/index");
var User     = require("./models/users");
var Blog     = require("./models/blogSchema");
var Comment  = require("./models/commentSchema");
    
//REQUIRING ROUTES
var indexRoutes = require("./routes/index");
var loginRoutes = require("./routes/auth/auth");
var commentRoutes  = require("./routes/comment/commentRoutes");
var blogRoutes  = require("./routes/blog/blog");

    
//APP CONFIGURATION  
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret : "i am coder",
    resave : false,
    saveUninitialized:false
//    resave : true,
//    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Sendind Variables values to all routes in our App
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
//    res.locals.error       = req.flash("error");
//    res.locals.success     = req.flash("success");
    next();
});

//USING ROUTES
app.use(indexRoutes);
app.use(loginRoutes);
app.use(commentRoutes);
app.use(blogRoutes);


//CREATE NEW PROPERTY
//Property.create({title:"First Property",
//                    adress: "Jhang Road Chiniot",
//                      city : "Multan",
//                    type: "commercial",
//                    description: "Using color to add meaning to a table row or individual cell only provides a visual indication, which will not be conveyed to users of assistive technologies – such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (the visible text in the relevant table row/cell), or is included through alternative means, such as additional text hidden with the .sr-only class.",
//                    image: "http://www.houseconstructioncompanysrilanka.gwisolutions.com/images/Single%20stroy%20House/AHC%20-%2016%20-%205.2mill.jpg"
//                   }, function(err, newlyCreated){
//        if(err){
//            console.log(err);
//        } else {
//            console.log(newlyCreated);
//        }
//   }); 














//SETTINGUP SERVER
var port = process.env.PORT || 3000;
app.listen(port,process.env.IP, function(){
    console.log("Real estate app server listening on port " + port);
});