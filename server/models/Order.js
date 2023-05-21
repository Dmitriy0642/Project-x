const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    addres: { type: String },
    fio: { type: String },
    numtel: { type: String },
    post: {
      type: String,
      enum: ["ПочтаРоссии", "СДЭК", "DHL"],
    },
    sity: { type: String },
    purchasedItem: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", schema);
