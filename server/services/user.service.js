"use strict";

const { NotFoundError } = require("../core/error.response");
const db = require("../models");

const User = db.User;

class UserService {
  static async getUserInfoById(userId) {
    const foundUser = await User.findOne({
      where: { _id: userId },
      attributes: { exclude: ["password", "_id", "role"] },
      raw: true,
    });

    if (!foundUser) {
      throw new NotFoundError("Error: Can not find the user");
    }

    if (foundUser) {
      return {
        user: foundUser,
      };
    }
  }

  static async updateUserInfo(userId, payload) {
    const updatedUser = await User.update(
      { payload },
      {
        where: {
          _id: userId,
        },
      }
    );

    if (!foundUser) {
      throw new NotFoundError("Error: Can not update this user");
    }

    if (foundUser) {
      return {
        user: updatedUser,
      };
    }
  }

  static async makeOrder(userId, payload) {
    const makedOrder = await db.Order.create({
      id_user: userId,
      id_hotel: payload.id_hotel,
      start_day: payload.start_day,
      end_day: payload.end_day,
      status: "PRE_ORDER",
      total_room: payload.total_room,
      total_price: payload.total_price,
      total_person: payload.total_person,
    });

    if (!makedOrder) {
      throw new NotFoundError("Error: Can make order");
    }

    if (makedOrder) {
      return {
        order: makedOrder,
      };
    }
  }
}

module.exports = UserService;
