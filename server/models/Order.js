const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    address: { type: String, required: true },
    fio: { type: String, required: true },
    numtel: { type: String, required: true },
    post: {
      type: String,
      enum: ["ПочтаРоссии", "СДЭК", "DHL"],
      required: true,
    },
    sity: { type: String, required: true },
    purchasedItem: {
      type: Array,
      _id: { type: Schema.Types.ObjectId, ref: "Product" },
      category: { type: String, required: true },
      firm: { type: String, required: true },
      img: { type: Array, required: true },
      name: { type: String, required: true },
      price: { type: String, required: true },
      quantity: { type: Array, required: true },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", schema);
