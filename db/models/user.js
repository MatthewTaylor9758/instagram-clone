"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    validatePassword(password) {
      return bcrypt.compareSync(password, this.password.toString());
    }
    static associate(models) {
      User.hasMany(models.Relationship, {
        foreignKey: "userId",
        otherKey: "relatedUserId",
      });
      User.hasMany(models.Picture, {
        foreignKey: "userID",
      });
      User.hasMany(models.Comment, {
        foreignKey: "userID",
      });
      User.hasMany(models.Like, {
        foreignKey: "userID",
      });
    }
  }
  User.init(
    {
      // Add in some validations? Need to add checks at every point?
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isPrivate: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
