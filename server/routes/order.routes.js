const express = require("express");
const Order = require("../models/Order");
const { check, validationResult } = require("express-validator");
const router = express.Router({ mergeParams: true });

///get All orders
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
router.patch("/:id", [
  check("numtel", "Phone number must contain 10 digits").isLength({ min: 10 }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const create = await Order.findOne({ user: id });

      if (!create) {
        const newData = {
          user: id,
          addres: req.body.addres,
          fio: req.body.fio,
          numtel: req.body.numtel,
          post: req.body.post,
          sity: req.body.sity,
          purchasedItem: [],
        };

        const newOrder = await Order.create(newData);
        res.status(200).send(newOrder);
      } else {
        create.addres = req.body.addres;
        create.fio = req.body.fio;
        create.numtel = req.body.numtel;
        create.post = req.body.post;
        create.sity = req.body.sity;

        const updatedOrder = await create.save();
        res.status(200).send(updatedOrder);
      }
    } catch (e) {
      res.status(500).json({
        message: "An error occurred on the server. Please try again later",
      });
    }
  },
]);
///get orderById
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const createOrder = await Order.ffindOne(id);
    res.status(200).send(createOrder);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.get("/:id/purchasedItem/:prodId/quantity", async (req, res) => {
  try {
    const { id } = req.params;
    const { prodId } = req.params;
    const findSelectedItem = await Order.findOne({ user: id });
    if (!findSelectedItem) {
      return null;
    }
    const findProductInPurchasedItem = findSelectedItem.purchasedItem.find(
      (item) => item._id.toString() === prodId
    );
    if (!findProductInPurchasedItem) {
      return undefined;
    }
    res.status(200).send(findProductInPurchasedItem.quantity);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
// /if user not find ,created data ,else user find push item to purchaseditem
//else if product find updated product
router.patch("/:id/purchasedItem/:prodId", async (req, res) => {
  try {
    const { id, prodId } = req.params;
    const data = { ...req.body };
    const findPurchasedFromUserId = await Order.findOne({ user: id });

    if (findPurchasedFromUserId) {
      const findProductIndex = findPurchasedFromUserId.purchasedItem.findIndex(
        (item) => item._id === prodId
      );

      if (findProductIndex !== -1) {
        findPurchasedFromUserId.purchasedItem[findProductIndex] = data;
      } else {
        findPurchasedFromUserId.purchasedItem.push(data);
      }

      await findPurchasedFromUserId.save();
      res.status(200).send(findPurchasedFromUserId);
    } else {
      res.status(500).json({ message: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "An error occurred on the server" });
  }
});

module.exports = router;
