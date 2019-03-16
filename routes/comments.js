var express = require("express");
var router = express.Router({mergeParams: true});
var Comment = require("../models/comment");
var Campground    = require("../models/campground");

router.get("/new", isLoggedIn, function(req, res) {
  // find campground by id
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

router.post("/", isLoggedIn, function(req, res) {
  // find campground by id
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      // create new comment
      Comment.create(req.body.comment, function(err, newComment) {
        if (err) {
          console.log(err);
        } else {
          newComment.author.id = req.user._id;
          newComment.author.username = req.user.username;
          newComment.save();
          campground.comments.push(newComment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

router.get("/:comment_id/edit", function (req, res) {
  Comment.findById(req.params.comment_id, function (err, foundComment) {
    if (err) {
      res.redirect("back")
    } else {
      Campground.findById(req.params.id, function(err, campground) {
        if (err) {
          console.log(err);
        }
        res.render("comments/edit", {comment: foundComment, campground: campground})
      })
    }
  })
})

router.put("/:comment_id", function (req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
    if (err) {
      res.redirect("/campgrounds")
    } else {
      res.redirect("..")
    }
  })
})

router.delete("/:comment_id", function (req, res) {
  Comment.findByIdAndDelete(req.params.comment_id, function (err) {
    if (err) {
      res.redirect("/campgrounds")
    } else {
      res.redirect("..")
    }
  })
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/campgrounds");
}

module.exports = router;