const express = require("express");
const Order = require("../models/Order");
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
    const { id, prodId } = req.params;
    const findSelectedItem = await Order.findOne({ user: id });

    if (!findSelectedItem) {
      return res.status(201).send(null);
    }

    if (findSelectedItem.purchasedItem.length === 0) {
      return res.status(200).send(null);
    }

    const findProductInPurchasedItem = findSelectedItem.purchasedItem.find(
      (item) => item._id.toString() === prodId
    );

    if (!findProductInPurchasedItem) {
      return res.status(200).send(null);
    }

    return res.status(200).send(findProductInPurchasedItem.quantity);
  } catch (e) {
    return res.status(500).json({
      message: "An error occurred on the server. Please try again later",
    });
  }
});
// /if user not find ,created data ,else user find push item to purchaseditem
//else if product find updated product
router.patch("/:id/purchasedItem/:prodId", async (req, res) => {
  try {
    const { id, prodId } = req.params;
    const dataForm = {
      user: id,
      fio: req.body.fio,
      addres: req.body.addres,
      sity: req.body.sity,
      numtel: req.body.numtel,
      post: req.body.post,
    };
    const product = req.body.purchasedItem;

    const findPurchasedFromUserId = await Order.findOne({ user: id });

    if (!findPurchasedFromUserId) {
      const newOrder = {
        ...dataForm,
        purchasedItem: [product[0]],
      };
      await Order.create(newOrder);
      res.status(200).send(newOrder);
    }

    if (findPurchasedFromUserId) {
      const findProductInPurchasedItem =
        findPurchasedFromUserId.purchasedItem.findIndex(
          (item) => item._id === prodId
        );
      if (findProductInPurchasedItem === -1) {
        findPurchasedFromUserId.purchasedItem.push(product[0]);
        await findPurchasedFromUserId.save();
        res.status(200).send(findPurchasedFromUserId);
      } else {
        findPurchasedFromUserId.purchasedItem[findProductInPurchasedItem] =
          product[0];
        await findPurchasedFromUserId.save();
        res.status(200).send(findPurchasedFromUserId);
      }
    }
  } catch (e) {
    res.status(500).json({ message: "An error occurred on the server" });
  }
});

module.exports = router;
