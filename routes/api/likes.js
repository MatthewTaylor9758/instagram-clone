const express = require("express");
const router = express.Router();
const db = require("../../db/models");
const { routeHandler } = require("../utils");
const { User, Relationship, Comment, Like, Picture, Status } = db;

router.post(
  "/",
  routeHandler(async (req, res, next) => {
    let { pictureId } = req.body;
    const userId = await parseInt(req.cookies.user);
    const like = await Like.create({
      pictureId,
      userId,
    });
    res.redirect("/");
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
      include: {
        model: User,
      },
    });
    const likes = await Like.findAll({
      where: {
        pictureId: picIds,
      },
      include: {
        model: User,
      },
    });
    const userLike = await Like.findOne({
      where: {
        userId: user.id,
      },
    });
    let totalLikes = 0;
    totalLikes = parseInt(likes.forEach((like) => totalLikes++));
    res.render("friend-feed.pug", {
      pictures,
      user,
      comments,
      likes,
      userLike,
      totalLikes,
    });
  })
);
module.exports = router;
