const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { routeHandler } = require("./utils");
const { User, Relationship, Comment, Like, Picture, Status } = db;

router.post(
  "/",
  routeHandler(async (req, res, next) => {
    const { pictureId } = req.body;
    const userId = await parseInt(req.cookies.user);
    const like = await Like.create({
      userId,
      pictureId,
    });
    res.redirect("/");
  })
);
router.get((req, res) => {
  res.render("error-page");
});
