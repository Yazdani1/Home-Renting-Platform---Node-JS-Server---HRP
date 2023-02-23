const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var homeRentalPostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
  rentAmount: {
    type: Number,
    required: true,
  },

  photo: {
    type: [String],
    required: true,
  },
  city: {
    type: String,
    required: true,
  },

  rooms: {
    type: Number,
    required: true,
  },

  visibility: {
    type: String,
    enum: ["Public", "Private"],
    default: "Public",
  },

  rented: {
    type: Boolean,
    default: false,
    required: true,
  },

  latitude: {
    type: Number,
    required: true,
  },

  longitude: {
    type: Number,
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

  categoryBy: {
    type: ObjectId,
    ref: "HomeRentalCategory",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HomeRentalPost", homeRentalPostSchema);
