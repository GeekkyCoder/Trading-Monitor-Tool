const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    min: [2, "username must be minimum of 2 characters"],
    max: [10, "username should be between 2 to 10 characters long"],
  },
  role: {
    type: String,
    enum: ["admin", "user", "management"],
    default: "user",
  },
},{timestamps:true});

module.exports = mongoose.model("user", userSchema);
