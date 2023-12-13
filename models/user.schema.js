const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

let user = mongoose.model("user", userModel);

module.exports = user;

