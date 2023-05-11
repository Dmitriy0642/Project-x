const express = require("express");
const Order = require("../models/Order");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await Order.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

///create order
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const createOrder = await Order.create(data);
    res.status(200).send(createOrder);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
///get orderById

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const createOrder = await Order.findById(id);
    res.status(200).send(createOrder);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
///changeById
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const createOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(createOrder);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
