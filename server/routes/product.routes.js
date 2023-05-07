const express = require("express");
const Product = require("../models/Product");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await Product.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
///find by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findById = await Product.findById(id);
    res.status(200).send(findById);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

///change by id
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findByIdAndChange = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(findByIdAndChange);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

///create product
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const createdProduct = await Product.create(data);
    res.status(200).send(createdProduct);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

///delete Product by id

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await Product.findByIdAndRemove(id);
    res.status(200).send(findProduct);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
