"use strict";
require("dotenv").config();

const db = require("../models");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const AccessService = require("./access.service");
const { getInfoData } = require("../utils");

const cloudinary = require("../config/cloudinary.config");

class HotelManagerService {
  static async getHotelIdForOwner(userId) {
    const foundHotel = await db.Hotel.findOne({
      where: {
        id_manager: userId,
      },
    });

    if (!foundHotel) {
      throw new NotFoundError("Can not find the hotel");
    }

    return foundHotel._id;
  }

  static async registerHotel(payload, role = "HOTEL_MANAGER") {
    // sign up manager
    const newManager = await AccessService.signUp(
      { email: payload.email, password: payload.password },
      role
    );

    // console.log(newManager);

    // register hotel

    if (!newManager) {
      throw new BadRequestError("Error: Can not register hotel");
    }

    const newHotel = await db.Hotel.create({
      id_manager: newManager.user._id,
      hotel_name: payload.hotel_name,
      house_number: payload.house_number,
      street_name: payload.street_name,
      code_ward: payload.ward_code,
      code_district: payload.district_code,
      code_province: payload.province_code,
      status: "ACTIVE",
    });

    if (newHotel) {
      return {
        manager: { ...newManager.user },
        hotel: getInfoData({
          fields: ["_id", "status"],
          object: newHotel,
        }),
      };
    }
  }

  static async getInfo(userId) {
    const foundHotel = await db.Hotel.findOne({
      where: {
        id_manager: userId,
      },
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
        // {
        //   model: db.Room,
        // },
        // {
        //   model: db.Order,
        //   include: [
        //     {
        //       model: db.RoomOrder,
        //       include: [db.Room],
        //     },
        //   ],
        // },

        // {
        //   model: db.HotelUtility,
        //   attributes: ["_id", "utility_name", "utility_icon"],
        //   include: [
        //     {
        //       model: db.Utility,
        //       attributes: ["_id", "utility_name", "utility_icon"],
        //     },
        //   ],
        // },
      ],
      // attributes: { exclude: ["id_hotel"] },
    });

    if (!foundHotel) {
      throw new NotFoundError("Error: Can not find the Hotel");
    }

    if (foundHotel) {
      return {
        hotel: foundHotel,
      };
    }
  }

  static async uploadImages(userId, files) {
    const hotelId = await this.getHotelIdForOwner(userId);

    // check max 6
    const imgCount = await db.HotelImage.count({
      where: { id_hotel: hotelId },
    });

    const remainingSlots = 6 - imgCount;

    if (files.length > remainingSlots) {
      throw new Error(
        `ERR: Limit iamge is 6, you can only upload ${remainingSlots} images`
      );
    }

    const uploadedImages = [];

    const uploadPromises = files.map((file, index) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path, function (error, result) {
          if (error) {
            throw new BadRequestError(
              `Error: Can not push image ---- Erorr-Detail: ${error}`
            );
          }
          // Create the hotel image in the database
          console.log(`result--- ${result}`);

          db.HotelImage.create({
            id_hotel: hotelId,
            image_url: result.url,
          })
            .then((uploadedImage) => {
              console.log(`result URL--- ${result.url}`);

              uploadedImages.push(result.url);
              resolve(uploadedImage);
            })
            .catch((err) => {
              throw new BadRequestError(
                `Error: Can not push image tp database ---- Erorr-Detail: ${err}`
              );
            });
        });
      });
    });

    await Promise.all(uploadPromises);

    return uploadedImages;
  }

  static async getUtilityList() {
    const foundUtilityList = await db.Utility.findAll();

    if (!foundUtilityList) {
      throw new BadRequestError("Error: Can not get Utils list");
    }

    return foundUtilityList;
  }

  static async addUtility(userId, payload) {
    const hotelId = await this.getHotelIdForOwner(userId);

    const existingUtility = await db.HotelUtility.findOne({
      where: {
        id_hotel: hotelId,
        id_utility: payload.id_utility,
      },
    });

    if (existingUtility) {
      throw new BadRequestError(
        `Error:  This utility already exists in your hotel`
      );
    }

    const addedUtility = await db.HotelUtility.create({
      id_hotel: hotelId,
      id_utility: payload.id_utility,
    });

    if (!addedUtility) {
      throw new BadRequestError(`Error: Can not add Utils to your hotel`);
    }

    return addedUtility;
  }
}

module.exports = HotelManagerService;
