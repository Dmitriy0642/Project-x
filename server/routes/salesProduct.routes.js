const express = require("express");
const SalesProduct = require("../models/SalesProduct");
const router = express.Router({ mergeParams: true });

///get all salesProduct
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

///create SalesProduct
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

///get salesProduct by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findById = SalesProduct.findById(id);
    res.status(201).send(findById);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

///change salesProduct By id
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
///change all product
router.patch("/", async (req, res) => {
  try {
    const updatedProduct = await SalesProduct.updateMany(id, req.body, {
      new: true,
    });
    res.status(201).send(updatedProduct);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
