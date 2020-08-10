const express = require("express");
const router = express.Router();
router.get("/login", (req, res, next) => {
  res.render("login");
});
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.get((req, res) => {
  res.render("error-page");
});
module.exports = router;
