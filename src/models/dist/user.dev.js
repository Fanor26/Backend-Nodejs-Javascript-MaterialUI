"use strict";

var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  cloudinary_id: {
    type: String
  }
});
module.exports = mongoose.model("User", userSchema);