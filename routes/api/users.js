const express = require("express");
const router = express.Router();
const db = require("../../db/models");
const { User } = db;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../../config").jwtConfig;
const { routeHandler } = require("../utils");
const { getUserToken } = require("../utils/auth");
router.post(
  "/token",
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
    res.json({ id: user.id, token });
  })
);
router.post(
  "/",
  routeHandler(async (req, res, next) => {
    const { userName, password, email } = req.body;
    const user = await User.create({
      userName,
      password: bcrypt.hashSync(password, 10),
      email,
      isPrivate: false,
    });
    const token = await getUserToken(user);
    res.cookie("token", token, { maxAge: expiresIn * 1000 });
    res.json({ id: user.id, token });
  })
);
module.exports = router;
