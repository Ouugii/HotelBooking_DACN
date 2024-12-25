"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RoomOrder extends Model {
    static associate(models) {
      // Define associations here if needed
      RoomOrder.hasMany(models.Room, { foreignKey: "_id" });
      RoomOrder.hasMany(models.Order, { foreignKey: "_id" });
    }
  }

  RoomOrder.init(
    {
      id_room: {
        type: DataTypes.INTEGER,
      },
      id_order: {
        type: DataTypes.INTEGER,
      },
      start_day: {
        type: DataTypes.DATE,
      },
      end_day: {
        type: DataTypes.DATE,
      },
      total_price: {
        type: DataTypes.BIGINT.UNSIGNED,
      },
    },
    {
      sequelize,
      modelName: "RoomOrder",
      tableName: "room_order",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return RoomOrder;
};
