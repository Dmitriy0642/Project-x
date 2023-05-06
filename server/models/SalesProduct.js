const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    category: { type: String, required: true },
    firm: { type: String, required: true },
    img: { type: Array, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Token", schema);
