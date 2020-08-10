"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Picture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Picture.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Picture.hasMany(models.Comment, {
        foreignKey: "pictureId",
      });
      Picture.hasMany(models.Like, {
        foreignKey: "pictureId",
      });
    }
  }
  Picture.init(
    {
      userId: DataTypes.INTEGER,
      fileLocation: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Picture",
    }
  );
  return Picture;
};
