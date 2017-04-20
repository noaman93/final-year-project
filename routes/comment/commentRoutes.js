var express = require("express");
var router  = express.Router();
var User = require("../../models/users");
var Blog = require("../../models/blogSchema");
var Comment = require("../../models/commentSchema");
var MongoClient = require('mongodb').MongoClient;
var middleware  = require("../../middleware/middleware.js");


//====================================
//     COMMENTS ROUTES
//====================================

//CREATE NEW COMMENT    
router.post("/property-blog/:id/comments",middleware.isLoggedIn, function(req,res){
//    res.send(req.body.comment)
    Blog.findById(req.params.id,function(err,blog){
        if(err){
            console.log(err);
            console.log("whyyyyyyyyyyyyyyyyyyyyyyyy");
            console.log(blog);
        } else {
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                } else {
                    
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    blog.comments.push(comment);
                    blog.save();
                    res.redirect("/property-blog/" + blog._id );
                }
            });
        }
    });
});

//RENDER NEW COMMENT FORM
//router.get("/property-blog/:id/comments/new", function(req,res){
//    Blog.findById(req.params.id, function(err,found){
//        if(err){
//            console.log(err);
//        } else {
//            res.render("comment/create-comment", {title:"New Comment", blog: found});
//        }
//    });
//    
//});


module.exports = router;