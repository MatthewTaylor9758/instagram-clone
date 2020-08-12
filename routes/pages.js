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
    // const pictures = await Picture.findAll({
    //   include: { model: User, model: Comment },
    // });
    const user = await User.findOne({
      where: {
        id: await parseInt(req.cookies.user),
      },
    });
    // const picIds = [];
    // pictures.forEach((picture) => picIds.push(picture.id));
    // const comments = await Comment.findAll({
    //   where: {
    //     pictureId: picIds,
    //   },
    //   include: {
    //     model: User,
    //   },
    // });
    // const likes = await Like.findAll({
    //   where: {
    //     pictureId: picIds,
    //   },
    //   include: {
    //     model: User,
    //   },
    // });
    // const userLike = await Like.findOne({
    //   where: {
    //     userId: user.id,
    //   },
    // });
    // let totalLikes = 0;
    // totalLikes = parseInt(likes.forEach((like) => totalLikes++));
    res.render("friend-feed.pug", { user });
  })
);
router.get((req, res) => {
  res.render("error-page");
});

module.exports = router;
