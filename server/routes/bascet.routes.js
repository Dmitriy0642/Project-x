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
///crete Bascet and AddedToBascet
router.patch("/:id", async (req, res) => {
  try {
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
///PushedToBascet
router.patch("/:id/:prodId", async (req, res) => {
  try {
    const { id, prodId } = req.params;
    const { quantity } = req.body;

    const findeCurrentBascet = await Bascet.findOne({ user: id });
    if (findeCurrentBascet === null) {
      const newData = { user: id, bascet: [req.body] };
      await Bascet.create(newData);
    }

    const productExists = findeCurrentBascet.bascet.some(
      (item) => item._id === prodId
    );
    if (productExists) {
      await Bascet.findOneAndUpdate(
        { user: id, "bascet._id": prodId },
        { $set: { "bascet.$.quantity": quantity } },
        { new: true }
      );
    } else {
      const newItem = { ...req.body };
      findeCurrentBascet.bascet.push(newItem);
      await findeCurrentBascet.save();
    }
  } catch (error) {
    res.status(500).json({ message: "На сервере произошла ошибка" });
  }
});
///counter
router.patch("/:id/bascet/:prodId", async (req, res) => {
  try {
    const { id } = req.params;
    const { prodId } = req.params;
    const { quantity } = req.body;

    const basket = await Bascet.findOne({ user: id });

    if (!basket) {
      return res.status(500).json({ message: "The user does not exist." });
    }

    if (basket.isUpdating) {
      return res
        .status(429)
        .json({
          message: "Basket is currently being updated. Please try again later.",
        });
    }

    basket.isUpdating = true;
    await basket.save();

    await Bascet.findOneAndUpdate(
      { user: id, "bascet._id": prodId },
      { $set: { "bascet.$.quantity": quantity } },
      { new: true }
    );

    basket.isUpdating = false;
    await basket.save();
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

///delete bascet after buing
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

router.delete("/:id/bascet/:prodId", async (req, res) => {
  try {
    const { id, prodId } = req.params;

    const updatedBasket = await Bascet.findOneAndUpdate(
      { user: id },
      { $pull: { bascet: { _id: prodId } } },
      { new: true }
    );

    if (!updatedBasket) {
      return res.status(404).json({ message: "Basket or Product not found" });
    }

    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred on the server" });
  }
});

module.exports = router;
