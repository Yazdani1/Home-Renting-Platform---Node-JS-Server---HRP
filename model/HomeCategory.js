const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;


var homeRentalCategorySchema = mongoose.Schema({

  categoryName: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    lowercase: true,
    unique: true,
    index: true,
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

module.exports = mongoose.model("HomeRentalCategory", homeRentalCategorySchema);
