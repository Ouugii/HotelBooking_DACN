"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RoomUtility extends Model {
    static associate(models) {
      // Define associations here if needed
      RoomUtility.belongsTo(models.Room, { foreignKey: "id_room" });
      RoomUtility.belongsTo(models.Utility, { foreignKey: "id_utility" });
    }
  }

  RoomUtility.init(
    {
      id_room: {
        type: DataTypes.INTEGER,
      },
      id_utility: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "RoomUtility",
      tableName: "room_utility",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return RoomUtility;
};
