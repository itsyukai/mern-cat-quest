const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");

const Inventory = require("../../models/Inventory");

// @route   Get api/inventories
// @desc    Get user's inventory
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const inventory = await Inventory.findOne({ owner: req.user.id });

    if (!inventory) throw Error("No inventory found for user");
    res.json(inventory);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// @route   POST api/inventories
// @desc    Create inventory
// @access  Private
router.post("/", auth, (req, res) => {
  const newInventory = new Inventory({
    owner: req.body.owner,
    gold: req.body.gold,
    items: req.body.items,
  });

  newInventory
    .save()
    .then((inventory) => res.json(inventory))
    .catch((err) => res.status(500).json({ err }));
});

// @route   PUT api/inventories/u/:id
// @desc    Update inventory
// @access  Private

router.put("/", auth, (req, res) => {
  const updatedInventory = {
    owner: req.body.owner,
    gold: req.body.gold,
    items: req.body.items,
  };

  // returnOriginal must be used instead of returnNewDocument
  // Node driver vs Mongodb inconsistency
  Inventory.findOneAndReplace({ owner: req.body.owner }, updatedInventory, {
    returnOriginal: false,
    useFindAndModify: false,
  })
    .then((inventory) => {
      res.json(inventory);
    })
    .catch((err) => res.status(500).json({ err }));
});

// @route   DELETE api/inventories/d/:id
// @desc    Delete inventory (as part of account deletion)
// @access  Private

router.delete("/d/:id", auth, (req, res) => {
  Inventory.findByIdAndDelete(req.params.id)
    .then((inventory) => res.json({ inventory, success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
