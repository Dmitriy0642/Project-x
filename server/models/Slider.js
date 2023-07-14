const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    image:{type:Array , required : true}
  },
  {
    timestamps: true,
  }
);

module.exports = model("Slider", schema);