const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    bascet: { type: Array },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Bascet", schema);
