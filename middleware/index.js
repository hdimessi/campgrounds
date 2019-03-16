var Comment = require("../models/comment");
var Campground = require("../models/campground");
// all the middlewares
var middlewareObj = {};

middlewareObj.verifyCommentOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err) {
        res.redirect("back");
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};
middlewareObj.verifyCampgroundOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCampground) {
      if (err) {
        res.redirect("back");
      } else {
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};
middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.app.locals.error = {login: {
    style: "alert-danger",
    content: "You need to be logged in to do that"
  }};
  res.redirect("/campgrounds");
};

module.exports = middlewareObj;
