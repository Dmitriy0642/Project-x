const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const tokenService = require("../services/token.service");
const { check, validationResult } = require("express-validator");
const router = express.Router({ mergeParams: true });

router.post("/signUp", [
  check("email", "Некорректные email").isEmail(),
  check("password", "Минимальная длинна пароля 8 символов").isLength({
    min: 8,
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            errors: errors.array(),
          },
        });
      }
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
  },
]);

router.post("/signInWithPassword", [
  check("email", "Email не корректный").normalizeEmail().isEmail(),
  check("password", "Пароль не может быть пустым").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: { message: "INVALID_DATA", code: 400 },
        });
      }
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).send({
          error: {
            message: "EMAIL_NOT_FOUND",
            code: 400,
          },
        });
      }
      const isPassworEqual = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPassworEqual) {
        return res.status(400).send({
          error: {
            message: "INVALID_PASSWORD",
            code: 400,
          },
        });
      }
      const tokens = tokenService.generate({ _id: existingUser._id });
      await tokenService.save(existingUser._id, tokens.refreshToken);
      res.status(200).send({ ...tokens, userId: existingUser._id });
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  },
]);

router.post("/token", async (req, res) => {});

module.exports = router;
