const express = require("express");
const router = express.Router();
const db = require("../../db/models");
const { User } = db;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../../config").jwtConfig;
const { routeHandler, handleValidationErrors } = require("../utils");
const { getUserToken } = require("../utils/auth");
const { check, validationResult } = require("express-validator");

const validateUserName = [check("userName").exists()];

const validateAuthFields = [
  check("userName").exists().isLength({ min: 5, max: 70 }),
  check("email", "Email field must be a valid email").exists(),
  check("email").isEmail(),
  check("password").exists(),
  check("password", "Password must be 6 or more characters").isLength({
    min: 5,
    max: 70,
  }),
  check("password2", "Confirm password field")
    .exists()
    .isLength({ min: 5, max: 70 })
    .custom((value, { req }) => value === req.body.password),
];

router.post(
  "/token",
  validateAuthFields,
  validateUserName,
  handleValidationErrors,
  routeHandler(async (req, res, next) => {
    const { userName, password } = req.body;
    const user = await User.findOne({
      where: {
        userName,
      },
    });
    if (!user || !user.validatePassword(password)) {
      const err = new Error("Invalid UserName/Password");
      err.status = 401;
      err.title = "Unauthorized";
      throw err;
    }
    const token = getUserToken(user);
    res.cookie("token", token, { maxAge: expiresIn * 1000 });
    res.cookie("user", user.id);
    res.json({ id: user.id, token });
  })
);
router.post(
  "/",
  validateAuthFields,
  validateUserName,
  handleValidationErrors,
  routeHandler(async (req, res, next) => {
    const { userName, password, email } = req.body;
    const user = await User.create({
      userName,
      password: bcrypt.hashSync(password, 10),
      email,
      isPrivate: false,
    });
    const token = await getUserToken(user);
    console.log(user)
    res.cookie("token", token, { maxAge: expiresIn * 1000 });
    res.json({ id: user.id, token });
  })
);
module.exports = router;
