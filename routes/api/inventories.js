const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");

const Inventory = require("../../models/Inventory");

// @route   GET api/inventories/:id
// @desc    Get Inventory
// @access  Private
router.get("/:id", auth, (req, res) => {
  Inventory.find()
    .sort({ date: -1 })
    .then((inventory) => res.json(inventory));
});

// @route   POST api/inventories
// @desc    Create/Update inventory
// @access  Private
router.post("/", auth, (req, res) => {
  const newInventory = new Inventory({
    owner: req.body.owner,
    items: req.body.items,
  });
  if (req.body._id) {
    Inventory.findOneAndUpdate({ _id: req.body._id }, newInventory, {
      upsert: true,
      useFindAndModify: false,
    })
      .then((inventory) => res.json(inventory))
      .catch((err) => res.status(500).json({ err }));
  } else {
    newInventory
      .save()
      .then((inventory) => res.json(inventory))
      .catch((err) => res.status(500).json({ err }));
  }
});

// @route   DELETE api/inventorys/d/:id
// @desc    Delete inventory (as part of account deletion)
// @access  Private

router.delete("/d/:id", auth, (req, res) => {
  Inventory.findById(req.params.id)
    .then((inventory) =>
      inventory.remove().then(() => res.json({ success: true }))
    )
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
