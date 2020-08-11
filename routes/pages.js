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

// router.post(
//   '/:id(\\d+)',
//   routeHandler(async (req, res, next) => {
//     console.log('this is a test');
//     const id = parseInt(req.params.id);
//     console.log(id);
//     const picture = await Picture.create({
//       userId,
//       fileLocation
//     })
//     res.redirect(`/${userId}`)
//   })
// )


router.get((req, res) => {
  res.render("error-page");
});

module.exports = router;
