const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Character Model
const Character = require("../../models/Character");

// @route   GET api/characters
// @desc    Get All Characters
// @access  Public
router.get("/", (req, res) => {
  Character.find()
    .sort({ date: -1 })
    .then(characters => res.json(characters));
});

// @route   POST api/characters
// @desc    Create a Character
// @access  Private
router.post("/", auth, (req, res) => {
  const newCharacter = new Character({
    name: req.body.name
  });

  newCharacter.save().then(character => res.json(character));
});

// @route   DELETE api/characters/:id
// @desc    Delete a Character
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Character.findById(req.params.id)
    .then(character =>
      character.remove().then(() => res.json({ sucess: true }))
    )
    .catch(err => res.status(404).json({ sucess: false }));
});

module.exports = router;