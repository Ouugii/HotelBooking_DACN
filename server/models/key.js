"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      // Define associations here if needed
      Token.belongsTo(models.User, { foreignKey: "id_user" });
    }
  }

  Token.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_user: {
        type: DataTypes.INTEGER,
      },
      refreshTokenUsed: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Key",
      tableName: "key",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      indexes: [
        {
          unique: false,
          fields: ["refreshTokenUsed"],
        },
      ],
    }
  );

  return Token;
};
