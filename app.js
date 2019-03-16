var express           = require("express"),
    app               = express(),
    bodyParser        = require("body-parser"),
    mongoose          = require("mongoose"),
    passport          = require("passport"),
    LocalStrategy     = require("passport-local"),
    campgroundRoutes  = require("./routes/campgrounds"),
    commentRoutes     = require("./routes/comments"),
    indexRoutes       = require("./routes/index"),
    User              = require("./models/user"),
    methodOverride    = require("method-override"),
    seedDB            = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true
});
mongoose.set('useFindAndModify', false);
// Reset Fake Data
// seedDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// PASSPORT CONFIG
app.use(
  require("express-session")({
    secret: "Nouha is awesome",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(2800, "localhost", function() {
  console.log("YelCamp server has started");
});
