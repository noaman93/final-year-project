var express = require("express");
var router  = express.Router();
var User = require("../../models/users");
var passport = require("passport");


//=======================
//    Login Route
//=======================

//Render Login Form
router.get("/login", function(req,res){
    var title = "Login";
    res.render("auth/login", {title: title});
});

//Signin Logic
router.post("/login", passport.authenticate("local", 
    {
    successRedirect: "/",
    failureRedirect: "/login",
//    failureFlash: true,
//    successFlash: 'Welcome!'
}), function(req,res){
    
});


//=======================
//    Logout Route
//=======================

//LOGOUT ROUTE
router.get("/logout",function(req,res){
    req.logout();
//    req.flash("success", "You have been loggedout");
    res.redirect("/");
});

//=======================
//    Signup Routes
//=======================

//Render Signup Form
router.get("/signup", function(req,res){
    var title = "Signup Form";
    res.render("auth/signup.ejs",{title: title, error:1});
});



//Handle Signup Logic
router.post("/signup",function(req,res){
    var data = {userType: req.body.userType,
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                username : req.body.username,
                email : req.body.email,
                phoneNumber : req.body.phoneNumber
               }
    var newUser = new User(data);
    User.register( newUser, req.body.password,function(err,user){
        if(err){
            //you can either set a flash message on the req.flash object before returning a res.redirect() or you can pass the req.flash object into the res.render() function.
            //req.flash("error", err.message);
            console.log(err.message);
            return res.render("auth/signup", {error : err.message, title: "Signup"});
        }
        passport.authenticate("local")(req,res,function(){
//            req.flash("success", "Welcome to Makaan " + user.username );
            res.redirect("/");
        });
    });
});












module.exports = router;