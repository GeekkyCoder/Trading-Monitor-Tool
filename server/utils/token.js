const jwt = require("jsonwebtoken");
require("dotenv").config()

async function generateToken(user) {
  return await jwt.sign(
    { userId: user._id, userName: user.userName },
    process.env.ACCESS_TOKEN,
    { expiresIn: "365d" }
  );
}

module.exports = {
  generateToken,
};
