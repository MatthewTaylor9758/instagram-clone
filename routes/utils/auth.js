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
