const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const tokenService = require("../services/token.service");
const router = express.Router({ mergeParams: true });

router.post("/signUp", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: {
          message: "EMAIL_EXIST",
          code: 400,
        },
      });
    }
    const hasedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      ...req.body,
      balance: 10000,
      password: hasedPassword,
    });
    const tokens = tokenService.generate({
      _id: newUser._id,
    });
    await tokenService.save(newUser._id, tokens.refreshToken);
    res.status(201).send({ ...tokens, userId: newUser._id });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/signInWithPassword", async (req, res) => {});

router.post("/token", async (req, res) => {});

module.exports = router;
