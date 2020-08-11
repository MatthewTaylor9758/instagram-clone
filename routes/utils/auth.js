const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../../config").jwtConfig;
const { User } = require("../../db/models");
exports.getUserToken = async (user) => {
  return await jwt.sign(
    {
      id: user.id,
      username: user.userName,
    },
    secret,
    { expiresIn: parseInt(expiresIn) }
  );
};
const restoreUser = (req, res, next) => {
  // token being parsed from request header by the bearerToken middleware
  // function in app.js:
  const { token } = req;

  if (!token) {
    const err = new Error("Unauthorized");
    err.status = 401;
    return next(err);
  }

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      err.status = 401;
      return next(err);
    }

    const { id } = jwtPayload.data;

    try {
      req.user = await User.findByPk(id);
    } catch (e) {
      e.status = 401;
      return next(e);
    }

    if (!req.user) {
      // Send a "401 Unauthorized" response status code
      // along with an "WWW-Authenticate" header value of "Bearer".
      return res.set("WWW-Authenticate", "Bearer").status(401).end();
    }

    return next();
  });
};
const bearerToken = require("express-bearer-token");

// OTHER CODE IN THE FILE NOT SHOWN

exports.requireAuth = [bearerToken(), restoreUser];
