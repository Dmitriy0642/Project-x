const express = require("express");
const Product = require("../models/Product");
const router = express.Router({ mergeParams: true });

///get all product
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

router.get("/:quantity", async (req,res)=>{
  try {
    const list = await Product.find()
    const listQuantity = await list.map((item)=>{
      return item.quantity
    })
    res.status(200).send(listQuantity)
  } catch (error) {
    res.status(500).json({
      message: "Server are has problem"
    })
  }
})

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
    const findAndUpdate = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.status(200).send(findAndUpdate);
  } catch (e) {
    res.status(500).json({
      message: "An error occurred on the server. Please try again later",
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

  

///find quantity by id
router.get("/:id/quantity", async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await Product.findById(id);
    res.status(200).send(findProduct.quantity);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
///change quantity by id
router.patch("/:id/quantity", async (req, res) => {
  try {
    const { id } = req.params;
    const findOne = await Product.findOne({ _id: id });
    if (findOne) {
      findOne.quantity = req.body;
      await findOne.save();
      res.status(200).send(findOne);
    }
  } catch (e) {
    res.status(500).json({
      message: "An error occurred on the server. Please try again later.",
    });
  }
});

module.exports = router;
