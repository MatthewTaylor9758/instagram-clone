"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
