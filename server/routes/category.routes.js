const express = require("express");
const Category = require("../models/Category");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await Category.find();
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
    const list = await Category.findById(id);
    console.log(list);
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

///create firm
router.post("/", async (req, res) => {
  try {
    const list = await Category.create(req.body);
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
