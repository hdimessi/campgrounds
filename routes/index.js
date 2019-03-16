var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res) {
  res.render("landing");
});

// ===================
// AUTH ROUTES
// ===================

router.post("/register", function(req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      req.app.locals.error = {register: {
        style: "alert-danger",
        content: err
      }};
      return res.redirect("back");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/campgrounds");
    });
  });
});

router.post("/login", function(req, res) {
  
  passport.authenticate('local', function(err, user, info) {
    console.log("auth");
    
    if (err) { 
      req.app.locals.error = {login: {
        style: "alert-danger",
        content: err
      }};
      console.log("first err");
      return res.redirect("back");
    }
    if (!user) { 
      req.app.locals.error = {login: {
        style: "alert-danger",
        content: "username / password combo not found"
      }};
      console.log("no user");
      return res.redirect("back");
    }
    req.logIn(user, function(err) {
      console.log("finish auth");
      if (err) { 
        req.app.locals.error = {login: {
          style: "alert-danger",
          content: err
        }};
        console.log("second err");
        return res.redirect("back");
      }
      console.log("success");
      return res.redirect("back");
    });
  })(req, res);
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/campgrounds");
});

module.exports = router;