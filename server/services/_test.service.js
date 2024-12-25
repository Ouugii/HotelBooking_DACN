"use strict";

const { NotFoundError, BadRequestError } = require("../core/error.response");
const db = require("../models");
const hotel = require("../models/hotel");

class TestService {
  static async test_GetDetailHotel(hotelId) {
    const foundHotel = await db.Hotel.findByPk(hotelId, {
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
      // attributes: { exclude: ["code_ward"] },
    });

    if (!foundHotel) {
      throw new NotFoundError("Error: Can not find the Hotel");
    }

    if (foundHotel) {
      return {
        hotel: foundHotel,
      };
    }

    return null;
  }

  static async testPostMethod(payload) {
    if (!payload) {
      throw new BadRequestError("Error: Can not send data from client");
    }
    console.log(payload);
    return payload;
  }
}

module.exports = TestService;
