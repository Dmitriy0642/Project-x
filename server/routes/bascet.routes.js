const express = require("express");
const Bascet = require("../models/Bascet");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await Bascet.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
///crete Bascet
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const createdBascet = await Bascet.create(data);
    res.status(200).send(createdBascet);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

///find By id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findById = await Bascet.findById(id);
    res.status(200).send(findById);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
///change By Id
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findById = await Bascet.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(findById);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
