// all the middleare goes here
var middlewareObj = {};


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login first to complete this action!");
    res.redirect("/login");
}

module.exports = middlewareObj;