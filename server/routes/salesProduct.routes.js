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

module.exports = router;
