const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  owner: {
    type: String,
    required: true,
  },
  gold: {
    type: Number,
    required: true,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
      },
      craftMessage: {
        type: String,
      },
      components: [{ type: String }],
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

module.exports = Inventory = mongoose.model("Inventory", InventorySchema);
