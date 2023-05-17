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
    const findUserBasket = await Bascet.findOne({ user: id });
    if (!findUserBasket) {
      const newData = { user: id, bascet: [req.body] };
      await Bascet.create(newData);
      res.status(200).send(newData);
    } else {
      const newItem = { ...req.body };
      findUserBasket.bascet.push(newItem);
      await findUserBasket.save();
      res.status(200).send(findUserBasket);
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/:id/bascet/:prodId", async (req, res) => {
  try {
    const { id, prodId } = req.params;
    const { quantity } = req.body;

    const updatedBasket = await Bascet.findOneAndUpdate(
      { user: id, "bascet._id": prodId },
      { $set: { "bascet.$.quantity": quantity } },
      { new: true }
    );

    if (!updatedBasket) {
      return res.status(404).json({ message: "Basket or Product not found" });
    }

    const updatedProduct = updatedBasket.bascet.find(
      (item) => item._id.toString() === prodId
    );

    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "На сервере произошла ошибка" });
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

// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const list = await Bascet.find();
//     const findIdBascet = list.filter(
//       (item) => JSON.stringify(item.user) === JSON.stringify(id)
//     );
//     const bascet = findIdBascet[0]._id;
//     const findBascetById = await Bascet.findById(bascet);
//     const newData = { user: id, bascet: req.body };
//     console.log(newData);
//     // const newData = { user: id, bascet: res.body };

//     // res.status(200).send(newData);
//   } catch (e) {
//     res.status(500).json({
//       message: "На сервере произошла ошибка. Попробуйте позже",
//     });
//   }
// });

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
