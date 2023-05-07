const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, required: true },
    _id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Category", schema);
