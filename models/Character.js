const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const CharacterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Character = mongoose.model("character", CharacterSchema);
