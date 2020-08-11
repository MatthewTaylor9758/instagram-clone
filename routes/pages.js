const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { routeHandler } = require("./utils");
const { User, Relationship, Comment, Like, Picture, Status } = db;
const { getUserToken, requireAuth } = require("./utils/auth");

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
    const pictures = await Picture.findAll({
      include: { model: User, model: Comment },
    });
    const user = await User.findOne({
      where: {
        id: await parseInt(req.cookies.user),
      },
    });
    const picIds = [];
    pictures.forEach((picture) => picIds.push(picture.id));
    const comments = await Comment.findAll({
      where: {
        pictureId: picIds,
      },
    });
    const likes = await Like.findAll({
      where: {
        pictureId: picIds,
      },
    });
    res.render("friend-feed.pug", { pictures, user, comments, likes });
  })
);
router.post(
  "/",
  routeHandler(async (req, res, next) => {
    console.log("body req", req.body);
    const { content, pictureId } = req.body;
    const userId = await parseInt(req.cookies.user);
    const comment = await Comment.create({
      content,
      userId,
      pictureId,
    });
    res.redirect("/");
  })
);
router.get((req, res) => {
  res.render("error-page");
});

module.exports = router;
