const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Shema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "Defies description",
  },
  components: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
  value: {
    type: Number,
    default: 1,
  },
});

module.exports = Item = mongoose.model("item", ItemSchema);
