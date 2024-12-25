"use strict";
require("dotenv").config();

const db = require("../models");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const { Op } = require("sequelize");

class HotelService {
  static async getHotelInfo(hotelId) {
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
        {
          model: db.HotelImage,
          attributes: ["_id", "image_url"],
        },
        {
          model: db.Utility,
          through: {
            model: db.HotelUtility,
            attributes: [],
          },
          attributes: ["_id", "utility_name", "utility_icon"],
        },
        {
          model: db.Rating,
        },
      ],
      // attributes: { exclude: ["code_ward"] },
    });

    const avgPrices = await this.getAvgPrice(hotelId);

    if (!foundHotel || !avgPrices) {
      throw new NotFoundError("Error: Can not find the Hotel");
    }

    if (foundHotel && avgPrices) {
      return {
        hotel: foundHotel,
        avgPrice: avgPrices,
      };
    }
  }

  static async getAllRating(hotelId) {}

  static async getHotelList(search) {
    const foundHotel = await db.Hotel.findAll({
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
        {
          model: db.HotelImage,
          attributes: ["_id", "image_url"],
        },
        {
          model: db.Utility,
          through: {
            model: db.HotelUtility,
            attributes: [],
          },
          attributes: ["_id", "utility_name", "utility_icon"],
        },
        {
          model: db.Room,
          attributes: [],
          where: {
            is_ordered: false,
          },
          required: false,
        },
      ],
      // group: ["Hotel._id"],
      // having: db.Sequelize.literal(`COUNT(Rooms._id) >= ${search.num_of_room}`),
    });

    if (!foundHotel) {
      throw new NotFoundError("Error: Can not find hotel list");
    }

    if (foundHotel) {
      return {
        hotel: foundHotel,
      };
    }
  }

  static async getAvgPrice(hotelId) {
    const avgPrices = await db.Room.findAll({
      attributes: [
        "type_name",
        [db.sequelize.fn("AVG", db.sequelize.col("price")), "avg_price"],
      ],
      where: {
        id_hotel: hotelId,
        type_name: ["STD", "VIP"],
      },
      group: "type_name",
    });

    if (!avgPrices) {
      throw new BadRequestError("ERR: Can not get price");
    }

    return avgPrices;
  }

  static async getHotelList_v2(search) {
    const baseQuery = {
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
        {
          model: db.HotelImage,
          attributes: ["_id", "image_url"],
        },
        {
          model: db.Utility,
          through: {
            model: db.HotelUtility,
            attributes: [],
          },
          attributes: ["_id", "utility_name", "utility_icon"],
        },
        {
          model: db.Room,
          attributes: [],
          where: {
            is_ordered: false,
          },
          required: false,
        },
      ],
      group: ["Hotel._id"],
    };

    let foundHotels;

    if (Object.keys(search).length === 0) {
      foundHotels = await db.Hotel.findAll({
        ...baseQuery,
      });
    } else if (!search.num_of_room) {
      foundHotels = await db.Hotel.findAll({
        ...baseQuery,
        where: {
          [Op.or]: [
            { code_ward: search.code },
            { code_district: search.code },
            { code_province: search.code },
          ],
        },
      });
    } else {
      foundHotels = await db.Hotel.findAll({
        ...baseQuery,
        where: {
          [Op.or]: [
            { code_ward: search.code },
            { code_district: search.code },
            { code_province: search.code },
          ],
        },
        having: db.Sequelize.literal(
          `COUNT(Rooms._id) >= ${search.num_of_room}`
        ),
      });
    }

    if (!foundHotels) {
      throw new NotFoundError("Error: Can not find hotel list");
    }

    return {
      hotel: foundHotels,
    };
  }
}

module.exports = HotelService;
