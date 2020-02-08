const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");

// Character Model
const Character = require("../../models/Character");

// @route   GET api/characters/:id
// @desc    Get All Characters
// @access  Private
router.get("/:id", auth, (req, res) => {
  Character.find({ owner: `${req.params.id}` })
    .sort({ date: -1 })
    .then(characters => res.json(characters));
});

// @route   POST api/characters
// @desc    Create a Character
// @access  Private
router.post("/", auth, (req, res) => {
  if (req.body._id) {
    const newCharacter = {
      owner: req.body.owner,
      name: req.body.name,
      race: req.body.race,
      classes: req.body.classes,
      proficiency: req.body.proficiency,
      skills: req.body.skills,
      stats: req.body.stats,
      date: req.body.date
    };

    Character.findOneAndUpdate({ _id: req.body._id }, newCharacter, {
      upsert: true,
      useFindAndModify: false
    })
      .then(character => res.json(character))
      .catch(err => res.status(500).json({ err }));
  } else {
    const newCharacter = new Character({
      owner: req.body.owner,
      name: req.body.name,
      race: req.body.race,
      classes: req.body.classes,
      proficiency: req.body.proficiency,
      skills: req.body.skills,
      stats: req.body.stats,
      date: req.body.date
    });
    newCharacter
      .save()
      .then(character => res.json(character))
      .catch(err => res.status(500).json({ err }));
  }
});

// @route   DELETE api/characters/d/:id
// @desc    Delete a Character
// @access  Private
router.delete("/d/:id", auth, (req, res) => {
  Character.findById(req.params.id)
    .then(character =>
      character.remove().then(() => res.json({ sucess: true }))
    )
    .catch(err => res.status(404).json({ sucess: false }));
});

module.exports = router;
