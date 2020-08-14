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
    res.json({ like });
    // res.redirect('/');
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
    const likes = await Like.findAll({
      where: {
        pictureId: picIds,
      },
      include: [
        {
          model: User,
          attributes: ["userName"],
        },
      ],
    });
    const userLike = await Like.findOne({
      where: {
        userId: user.id,
      },
    });
    let totalLikes = 0;
    totalLikes = parseInt(likes.forEach((like) => totalLikes++));
    res.json({
      pictures,
      user,
      likes,
      userLike,
      totalLikes,
    });
  })
);
router.get(
  "/:id(\\d+)",
  routeHandler(async (req, res, next) => {
    const pictureId = parseInt(req.params.id, 10);
    const user = await User.findOne({
      where: {
        id: await parseInt(req.cookies.user),
      },
    });
    const likes = await Like.findAll({
      where: {
        pictureId,
      },
      include: [
        {
          model: User,
          attributes: ["userName"],
        },
      ],
    });
    const userLike = await Like.findOne({
      where: {
        userId: user.id,
      },
    });
    let totalLikes = 0;
    for (let i = 0; i < likes.length; ++i) {
      totalLikes++;
    }
    res.json({
      user,
      likes,
      userLike,
      totalLikes,
    });
  })
);

router.delete(
  "/:id(\\d+)",
  routeHandler(async (req, res, next) => {
    const likeId = parseInt(req.params.id, 10);
    const like = await Like.findByPk(likeId);
    await like.destroy();
    res.status(204).end();
  })
);
module.exports = router;
