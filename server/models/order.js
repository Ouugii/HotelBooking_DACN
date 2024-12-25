"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Hotel, { foreignKey: "id_hotel" });
      Order.belongsTo(models.User, { foreignKey: "id_user" });
      Order.hasOne(models.Rating, { foreignKey: "id_order" });

      Order.hasMany(models.RoomOrder, { foreignKey: "id_order" });

      Order.belongsToMany(models.Room, {
        through: "RoomOrder",
        foreignKey: "id_order",
      });
    }
  }

  Order.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: DataTypes.INTEGER,
      },
      id_hotel: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM("PRE_ORDER", "ON_ORDER", "DONE", "CANCEL"),
      },
      start_day: {
        type: DataTypes.DATE,
      },
      total_person: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      total_room: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      end_day: {
        type: DataTypes.DATE,
      },
      total_price: {
        type: DataTypes.BIGINT.UNSIGNED,
      },
      // virtul
      total_day: {
        type: DataTypes.VIRTUAL,
        get() {
          const endDay = this.getDataValue("end_day");
          const startDay = this.getDataValue("start_day");
          if (endDay && startDay) {
            const diffTime = Math.abs(endDay - startDay);
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          }
          return null;
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Order;
};
