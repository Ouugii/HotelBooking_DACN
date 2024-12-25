"use strict";

require("dotenv").config();
const { NotFoundError } = require("../core/error.response");
const db = require("../models");

class AdminService {
  static async addUtility() {}

  static async getHotelList() {
    const foundHotelList = await db.Hotel.findAll({
      include: [
        {
          model: db.Ward,
          attributes: ["code", "full_name"],
          include: [
            {
              model: db.District,
              attributes: ["code", "full_name"],
              include: [
                {
                  model: db.Province,
                  attributes: ["code", "full_name"],
                },
              ],
            },
          ],
        },
      ],
      // attributes: ["_id", "id_manager", "full_address", "status", "prioryty"],
    });

    if (!foundHotelList) {
      throw new NotFoundError("Error: Can not find Hotel List");
    }

    if (foundHotelList) {
      return foundHotelList.map((hotel) => ({
        _id: hotel._id,
        id_manager: hotel.id_manager,
        full_address: hotel.full_address,
        status: hotel.status,
        prioryty: hotel.prioryty,
      }));
    }
  }

  static async getUserList() {
    const foundUserList = await db.User.findAll({
      attributes: ["_id", "user_name", "email", "full_name", "role"],
    });

    if (!foundUserList) {
      throw new NotFoundError("Error: Can not find Hotel List");
    }

    if (foundUserList) {
      return foundUserList.map((user) => ({
        _id: user._id,
        user_name: user.user_name,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      }));
    }
  }

  static async getUtilityList() {
    const foundUtilityList = await db.Utility.findAll({ raw: true });

    if (!foundUtilityList) {
      throw new NotFoundError("Error: Can not find Hotel List");
    }

    if (foundUtilityList) {
      return foundUtilityList.map((user) => user.get({ plain: true }));
    }
  }
}

module.exports = AdminService;
