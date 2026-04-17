const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phone: String,
  age: Number,
  password: String,
  role: {
    type: String,
    default: "customer"
  }
});

module.exports = mongoose.model("User", userSchema);