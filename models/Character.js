const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const CharacterSchema = new Schema({
  owner: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  skills: [
    {
      name: {
        type: String,
      },
      level: {
        type: Number,
      },
    },
  ],
  stats: {
    health: Number,
    strength: Number,
    dexterity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Character = mongoose.model("character", CharacterSchema);
