// Import mongoose
const mongoose = require("mongoose");

// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const CollectionSchema = new Schema({
  official: {
    type: Number,
    required: true,
  },
  colName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    select: false,
  },
});

// create and export model
module.exports = mongoose.model("collections", CollectionSchema);
