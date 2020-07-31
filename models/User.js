const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
