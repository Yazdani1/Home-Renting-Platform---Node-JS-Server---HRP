const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var wishListSchema = mongoose.Schema({
  postOwner: {
    type: ObjectId,
    ref: "User",
  },

  postId: {
    type: ObjectId,
    ref: "HomeRentalPost",
  },

  postedBy: {
    type: ObjectId,
    ref: "User",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("WishList", wishListSchema);
