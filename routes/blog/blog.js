var express = require("express");
var router  = express.Router();
var Property = require("../../models/index.js");
var User = require("../../models/users");
var Blog = require("../../models/blogSchema");
var MongoClient = require('mongodb').MongoClient;
var middleware  = require("../../middleware/middleware.js");
var multer = require('multer');


var storage =   multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './public/uploads/blog-images');
  },
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var upload = multer({ storage : storage}).single('image');



//=====================
//    PropertyBlog
//=====================

//RENDER BLOG INDEX PAGE
router.get("/property-blog", function(req,res){
    Blog.find({}, function(err,found){
        if(err){
            console.log(err);
        } else {
            res.render("blog/property-blog", {blog: found, title:"Property Blog"});
        }
    });
    
});

//RENDER CREATE NEW BLOG PAGE
router.get("/property-blog/new", function(req,res){
    res.render("blog/create-blog", {title: "Create Blog"});
});

//CREATE NEW BLOG LOGIC
router.post("/property-blog", function(req,res){
    upload(req,res, function(err){
        if(err){
            return res.send("Error uploadind file");
        }
        
        var image = "/uploads/blog-images/" + req.file.filename;
        req.body.blog.image = image;
        
        console.log(req.body.blog);
        
        Blog.create(req.body.blog, function(err, newlyCreatedBlog){
            if(err){
                console.log(err);
            } else {
                res.redirect("/property-blog");
            }
        });
    });//upload function
});


//SHOW FULL BLOG DETAILS PAGE
router.get("/property-blog/:id", function(req,res){
    Blog.findById(req.params.id).populate("comments").exec (function(err, found){
        if(err){
            console.log(err);
        } else {
            res.render("blog/blog-details", {title: "Read Blog", blog: found});
        }
    });
    
});





module.exports = router;