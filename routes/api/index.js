const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const likesRouter = require("./likes");
const commentsRouter = require("./comments");
const { environment } = require("../../config");
const { ValidationError } = require("sequelize");
const picturesRouter = require('./pictures');
router.use("/users", usersRouter);

router.use('/pictures', picturesRouter);


router.use("/likes", likesRouter);
router.use("/comments", commentsRouter);

router.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    let error = err.errors.map((e) => e.message);
    next(error);
  }
  next()
});

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  if (!isProduction) console.log(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});
router.use("*", (req, res) => {
  res.status(404).json({ message: "route does not exist" });
});

module.exports = router;
