"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    static associate(models) {
      // Define associations here if needed
      Hotel.belongsTo(models.Ward, { foreignKey: "code_ward" });

      Hotel.belongsTo(models.District, { foreignKey: "code_district" });

      Hotel.belongsTo(models.Province, { foreignKey: "code_province" });

      Hotel.belongsTo(models.User, { foreignKey: "id_manager" });

      Hotel.hasMany(models.HotelImage, { foreignKey: "id_hotel" });

      Hotel.hasMany(models.Room, { foreignKey: "id_hotel" });

      Hotel.hasMany(models.HotelUtility, { foreignKey: "id_hotel" });

      Hotel.belongsToMany(models.Utility, {
        through: "HotelUtility",
        foreignKey: "id_hotel",
      });

      Hotel.hasMany(models.Order, { foreignKey: "id_hotel" });
      Hotel.hasMany(models.Rating, { foreignKey: "id_hotel" });
    }
  }

  Hotel.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      hotel_name: {
        type: DataTypes.STRING,
      },
      code_ward: {
        type: DataTypes.STRING(20),
      },
      code_district: {
        type: DataTypes.STRING(20),
      },
      code_province: {
        type: DataTypes.STRING(20),
      },
      id_manager: {
        type: DataTypes.INTEGER,
      },
      house_number: {
        type: DataTypes.STRING,
      },
      street_name: {
        type: DataTypes.STRING,
      },
      prioryty: {
        type: DataTypes.STRING,
        defaultValue: 1,
      },
      status: {
        type: DataTypes.ENUM("ACTIVE", "IMACTIVE"),
        defaultValue: "IMACTIVE",
      },
      full_address: {
        type: DataTypes.VIRTUAL,
        get() {
          if (this.Ward && this.Ward.District && this.Ward.District.Province) {
            return `${this.house_number} ${this.street_name} - ${this.Ward.full_name} - ${this.Ward.District.full_name} - ${this.Ward.District.Province.full_name}`;
          }
          return null;
        },
      },
    },

    {
      sequelize,
      modelName: "Hotel",
      tableName: "hotel",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Hotel;
};
