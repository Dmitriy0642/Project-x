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
router.post("/:id", [
  check("numtel", "Номер телефона должен содержать 10 цифр").isLength({
    min: 10,
  }),
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
          purchasedItem: req.body.purchasedItem,
        };
        await Order.create(newData);
        res.status(200).send(newData);
      }
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  },
]);
///get orderById
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const createOrder = await Order.findById(id);
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
    const findSelectedItem = await Order.findById(id);
    if (!findSelectedItem) {
      return null;
    }
    const findProductInPurchasedItem = findSelectedItem.purchasedItem.find(
      (item) => item._id.toString() === prodId
    );
    if (!findProductInPurchasedItem) {
      return null;
    }
    res.status(200).send(findProductInPurchasedItem.quantity);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
///if user not find ,created data ,else user find push item to purchaseditem
router.patch(":/id", async (req, res) => {
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
        purchasedItem: [req.body.purchasedItem],
      };
      await Order.create(newData);
      res.status(200).send(newData);
    } else {
      const newItem = { ...req.body };
      create.purchasedItem.push(newItem);
      await create.save();
      res.status(200).send(create);
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
