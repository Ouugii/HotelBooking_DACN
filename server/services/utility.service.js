"use strict";

const { NotFoundError } = require("../core/error.response");
const db = require("../models");

const Utility = db.Utility;

class UtilityService {
  static async createUtility(paylod) {
    const foundUtility = await Utility.create({
      utility_name: paylod.utility_name,
      utility_icon: paylod.utility_icon,
    });

    if (!foundUtility) {
      throw new NotFoundError("Error: Can not create Utility");
    }

    if (foundUtility) {
      console.log(foundUtility);
      return {
        utility: foundUtility,
      };
    }

    return null;
  }

  static async deleteUtility() {
    const foundUtilities = await Utility.findOne();

    if (!foundUtilities) {
      throw new NotFoundError("Error: Can not find utilities");
    }

    if (foundUtilities) {
      console.log(foundUtilities);
      return {
        utility: foundUtilities,
      };
    }

    return null;
  }

  static async updateUtility() {
    const foundUtilities = await Utility.findOne();

    if (!foundUtilities) {
      throw new NotFoundError("Error: Can not find utilities");
    }

    if (foundUtilities) {
      console.log(foundUtilities);
      return {
        utility: foundUtilities,
      };
    }

    return null;
  }

  static async getOneUtility() {
    const foundUtilities = await Utility.findOne();

    if (!foundUtilities) {
      throw new NotFoundError("Error: Can not find utilities");
    }

    if (foundUtilities) {
      console.log(foundUtilities);
      return {
        utility: foundUtilities,
      };
    }

    return null;
  }

  static async getAllUtilities() {
    const foundUtilities = await Utility.findOne();

    if (!foundUtilities) {
      throw new NotFoundError("Error: Can not find utilities");
    }

    if (foundUtilities) {
      console.log(foundUtilities);
      return {
        utility: foundUtilities,
      };
    }

    return null;
  }
}

module.exports = UtilityService;
