const express = require("express");
const router = express.Router();
const db = require("../../db/models");
const { routeHandler } = require("../utils");
const { User, Relationship, Comment, Like, Picture, Status } = db;
const { getUserToken, requireAuth } = require("../utils/auth");

router.get('/',
  routeHandler( async (req, res, next) => {
    const pictures = await Picture.findAll();
    res.json({ pictures });
  })
)

router.get(
  '/:id(\\d+)',
  routeHandler(async (req, res, next) => {
    const pictureId = parseInt(req.params.id, 10);
    const picture = await Picture.findByPk(pictureId);
    res.json({ picture });
  })
)

router.delete(
  '/:id(\\d+)',
  routeHandler(async (req, res, next) => {
    const pictureId = parseInt(req.params.id, 10);
    const picture = await Picture.findByPk(pictureId);
    console.log('picture', picture);
    await picture.destroy();
    res.status(204).end()
  })
)

module.exports = router;
