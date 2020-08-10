const { validationResult } = require("express-validator");

exports.routeHandler = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (err) {
    next(err);
  }
};

exports.handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg);
    const err = Error("bad request");
    err.errors = errors;
    err.status = 400;
    err.title = "bad request";
    next(err);
  }
  next();
};
