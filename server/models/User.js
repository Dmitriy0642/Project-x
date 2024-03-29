const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    balance: { type: Number, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
