"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Utility extends Model {
    static associate(models) {
      Utility.hasMany(models.HotelUtility, { foreignKey: "id_utility" });

      Utility.belongsToMany(models.Hotel, {
        through: "HotelUtility",
        foreignKey: "id_utility",
      });
    }
  }

  Utility.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      utility_name: {
        type: DataTypes.STRING,
      },
      utility_icon: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Utility",
      tableName: "utility",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Utility;
};
