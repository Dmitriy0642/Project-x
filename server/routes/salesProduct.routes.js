const express = require("express");
const SalesProduct = require("../models/SalesProduct");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await SalesProduct.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newdata = await SalesProduct.create(data);
    res.status(201).send(newdata);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await SalesProduct.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    await SalesProduct.updateOne(updatedProduct);
    res.status(201).send(updatedProduct);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
