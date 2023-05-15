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
///crete Bascet and Update
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const list = await Bascet.find();
    const findUserBascet = list.filter(
      (item) => JSON.stringify(item.user) === JSON.stringify(id)
    );
    if (findUserBascet.length === 0) {
      const newData = { user: id, bascet: req.body };
      await Bascet.create(newData);
      res.status(200).send(newData);
    } else {
      const bascetId = findUserBascet[0]._id;
      const findBascetById = await Bascet.findById(bascetId);
      const newData = { user: findBascetById.user, bascet: req.body };
      await findBascetById.updateOne(newData);
      res.status(200).send(newData);
    }
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
    const list = await Bascet.find();
    const findBascetById = list.filter(
      (item) => JSON.stringify(item.user) === JSON.stringify(id)
    );
    if (findBascetById[0] === undefined) {
      res.status(200).send([]);
    } else {
      const bascet = findBascetById[0].bascet;
      res.status(200).send(bascet);
    }
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

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const list = await Bascet.find();
    const findIdBascet = list.filter(
      (item) => JSON.stringify(item.user) === JSON.stringify(id)
    );
    const bascet = findIdBascet[0]._id;
    const findBascetById = await Bascet.findById(bascet);
    const newData = { user: id, bascet: res.body };
    await findBascetById.updateOne(newData);
    res.status(200).send(newData);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const list = await Bascet.find();
    const findBascetById = list.filter(
      (item) => JSON.stringify(item.user) === JSON.stringify(id)
    );
    const idBascet = findBascetById[0]._id;
    await Bascet.findByIdAndDelete(idBascet);
    res.status(200).json({
      message: "Корзина обновленна",
    });
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка",
    });
  }
});

module.exports = router;
