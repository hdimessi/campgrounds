var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var Campground = require("../models/campground");
var middleware = require("../middleware");

express().use(bodyParser.urlencoded({ extended: true }));

// INDEX - GET ALL CAMPGROUNDS
router.get("/", function(req, res) {
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log("err-->" + err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: campgrounds
      });
    }
  });
});

// CREAT - ADD NEW CAMPGROUND TO DB
router.post("/", middleware.isLoggedIn, function(req, res) {
  // get data from the form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {
    name: name,
    image: image,
    description: description,
    author: author
  };

  Campground.create(newCampground, function(err, campground) {
    if (err) {
      console.log("--->Error");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// NEW - SHOW FORM TO CREAT NEW CAMPGROUND
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

// SHOW - GET THE DETAILS OF ONE SPECIFIC CAMPGROUND
router.get("/:id", function(req, res) {
  // find the campgrounds with provided ID
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCampground) {
      if (err) {
        console.log("Error --->" + err);
      } else {
        // show the campgrounds page
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.verifyCampgroundOwnership, function(
  req,
  res
) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    res.render("campgrounds/edit", { campground: foundCampground });
  });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.verifyCampgroundOwnership, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(
    err,
    foundCampground
  ) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect(req.params.id);
    }
  });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.verifyCampgroundOwnership, function(req, res) {
  Campground.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      return res.redirect("/campgrounds");
    }
    res.redirect("/campgrounds");
  });
});

module.exports = router;
