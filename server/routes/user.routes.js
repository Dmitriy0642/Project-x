const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

/// changeUserById
router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.send(updatedUser);
    } else {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка",
    });
  }
});
///get all users
router.get("/", auth, async (req, res) => {
  try {
    const list = await User.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка",
    });
  }
});

///getUserById
router.get("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const list = await User.findById(userId);
    if (userId === req.user._id) {
      res.send(list);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка",
    });
  }
});

module.exports = router;
