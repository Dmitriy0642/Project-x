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
  },
  {
    timestamps: true,
  }
);

module.exports = model("Token", schema);
