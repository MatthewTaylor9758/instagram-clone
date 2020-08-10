const express = require("express");
const app = express();
app.set("view engine", "pug");
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const csrfProtection = require("csurf")({ cookie: true });
app.use(csrfProtection);
app.use("/public", express.static("public"));

app.use((req, res, next) => {
  res.setTimeout(1000);
  req.setTimeout(1000);
  next();
});

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});
app.use((req, res, next) => {
  res.render("error-page");
});
module.exports = app;
