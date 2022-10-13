// Import mongoose
const mongoose = require("mongoose");

// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const CardSchema = new Schema({
  value: {
    type: String,
    required: true,
  },
  cardName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  collectionId: {
    type: String,
    required: true,
  },
});

// create and export model
module.exports = mongoose.model("cards", CardSchema);
