const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,

  },
  email: {
    type: String,
    required: true,

  },
  password: {
    type: String,
    required: true,

  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
    index: true,
  },
  role: {
    type: String,
    enum : ['Admin','Subscriber'],
    default: 'Subscriber'
  },
  date: {
    type: Date,
    default: Date.now,
  },
  resetToken: String,
  expireToken: Date,
});



module.exports = mongoose.model("User", userSchema);
