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

///create SalesProduct and update
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productData = {
      _id: id,
      category: req.body.category,
      firm: req.body.firm,
      img: req.body.img,
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
    };

    const existingProduct = await SalesProduct.findByIdAndUpdate(
      id,
      productData,
      { new: true }
    );

    if (existingProduct) {
      res.status(200).send(existingProduct);
    } else {
      const newProduct = await SalesProduct.create({
        _id: id,
        ...productData,
      });
      res.status(201).send(newProduct);
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred on the server. Please try again later",
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

router.put("/", async (req, res) => {
  try {
    const list = await SalesProduct.findOne();
    if (!list) {
      const newData = req.body;
      await SalesProduct.create(newData);
      res.status(200).send(newData);
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
