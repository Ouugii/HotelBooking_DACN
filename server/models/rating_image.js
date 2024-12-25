"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RatingImage extends Model {
    static associate(models) {
      // Define associations here if needed
      RatingImage.belongsTo(models.Rating, { foreignKey: "id_rating" });
    }
  }

  RatingImage.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_rating: {
        type: DataTypes.INTEGER,
      },
      id_user: {
        type: DataTypes.STRING,
      },
    },

    {
      sequelize,
      modelName: "RatingImage",
      tableName: "rating_image",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return RatingImage;
};
