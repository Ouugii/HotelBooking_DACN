"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class HotelUtility extends Model {
    static associate(models) {
      // Define associations here if needed
      HotelUtility.hasMany(models.Hotel, { foreignKey: "_id" });
      HotelUtility.hasMany(models.Utility, { foreignKey: "_id" });
    }
  }

  HotelUtility.init(
    {
      id_hotel: {
        type: DataTypes.INTEGER,
      },
      id_utility: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "HotelUtility",
      tableName: "hotel_utility",
      timestamps: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return HotelUtility;
};
