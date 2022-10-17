// Import mongoose
const mongoose = require("mongoose");

// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const CardSchema = new Schema({
  value: {
    type: Intl,
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
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

// create and export model
module.exports = mongoose.model("cards", CardSchema);
