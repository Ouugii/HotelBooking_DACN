"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class HotelImage extends Model {
    static associate(models) {
      // Define associations here if needed
      HotelImage.belongsTo(models.Hotel, { foreignKey: "id_hotel" });
    }
  }

  HotelImage.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_hotel: {
        type: DataTypes.INTEGER,
      },
      image_url: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "HotelImage",
      tableName: "hotel_image",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return HotelImage;
};
