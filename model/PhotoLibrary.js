const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;


var photoLibrarySchema = mongoose.Schema({

  imageurl: {
    type: String,
    required: true,
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

module.exports = mongoose.model("PhotoLibrary", photoLibrarySchema);
