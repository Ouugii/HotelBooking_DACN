"use strict";

require("dotenv").config();
const { NotFoundError } = require("../core/error.response");
const { Op } = require("sequelize");
const db = require("../models");

const Province = db.Province;
const District = db.District;
const Ward = db.Ward;

class AddressService {
  static async getProvinces() {
    const province = await Province.findAll({ raw: true });
    if (!province) {
      throw new NotFoundError("Can not get provinces");
    } else {
      return { province };
    }
  }

  static async getDistrictsByProvinceCode(province_code) {
    const district = await District.findAll({
      where: { province_code: province_code },
      raw: true,
    });
    if (!district) {
      throw new NotFoundError("Can not get provinces");
    } else {
      return { district };
    }
  }

  static async getWardsByDistrictCode(district_code) {
    const ward = await Ward.findAll({
      where: { district_code: district_code },
      raw: true,
    });
    if (!ward) {
      throw new NotFoundError("Can not get Ward");
    } else {
      return { ward };
    }
  }

  static async searchPlace(search) {
    const query = search.query;
    try {
      const provinces = await Province.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${query}%` } },
            { name_en: { [Op.like]: `%${query}%` } },
            { full_name: { [Op.like]: `%${query}%` } },
          ],
        },
        limit: 2,
      });

      const districts = await District.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${query}%` } },
            { name_en: { [Op.like]: `%${query}%` } },
            { full_name: { [Op.like]: `%${query}%` } },
          ],
        },
        limit: 7,
      });

      // const wards = await Ward.findAll({
      //   where: {
      //     [Op.or]: [
      //       { name: { [Op.like]: `%${query}%` } },
      //       { name_en: { [Op.like]: `%${query}%` } },
      //       { full_name: { [Op.like]: `%${query}%` } },
      //     ],
      //   },
      //   limit: 4,
      // });

      // const place = [...provinces, ...districts];
      return { provinces, districts };
    } catch (error) {
      console.error("Error while searching:", error);
      throw new Error("Internal server error");
    }
  }
}

module.exports = AddressService;
