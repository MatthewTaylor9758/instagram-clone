const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { routeHandler } = require("./utils");
const { User, Relationship, Comment, Like, Picture, Status } = db;
const { getUserToken, requireAuth } = require("./utils/auth");
// const pics = require('../public/images');

router.get("/login", (req, res, next) => {
  res.render("login");
});
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.get(
  "/:id(\\d+)",
  routeHandler(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const user = await User.findOne({
      where: {
        id,
      },
    });
    const pictures = await Picture.findAll({
      where: {
        userId: user.id,
      },
    });
    res.render("user-page.pug", { user, pictures });
  })
);
router.get(
  "/",
  routeHandler(async (req, res, next) => {
    console.log('found it');
    console.log(req.cookies.user);
    if (!req.cookies.user) {
      res.render('login');
      return;
    }
    const user = await User.findOne({
      where: {
        id: await parseInt(req.cookies.user),
      },
    });
    res.render("friend-feed.pug", { user });
  })
);
router.get((req, res) => {
  res.render("error-page");
});

module.exports = router;
