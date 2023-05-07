const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    category: { type: String, required: true },
    firm: { type: String, required: true },
    img: { type: Array, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", schema);
