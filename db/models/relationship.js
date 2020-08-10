"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Relationship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Relationship.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Relationship.belongsTo(models.User, {
        foreignKey: "relatedUserId",
      });
    }
  }
  Relationship.init(
    {
      userId: DataTypes.INTEGER,
      relatedUserID: DataTypes.INTEGER,
      statusCode: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Relationship",
    }
  );
  return Relationship;
};
