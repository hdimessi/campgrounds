var mongoose = require("mongoose");
var passportLocalMongooose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongooose);

module.exports = mongoose.model("User", userSchema);