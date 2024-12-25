"use strict";

require("dotenv").config();
const { getInfoData } = require("../utils");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { AuthFailureError } = require("../core/error.response");

const Key = db.Key;

class KeyService {
  static async storeRefreshToken({ id_user, refreshTokenUsed }) {
    const store = await Key.create({
      id_user: id_user,
      refreshTokenUsed: refreshTokenUsed,
    });

    return store;
  }

  static async createTokenPair(foundUser) {
    const accessToken = jwt.sign(
      {
        _id: foundUser._id,
        role: foundUser.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10d" }
    );

    const refreshToken = jwt.sign(
      {
        _id: foundUser._id,
        role: foundUser.role,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  static async refesh(refreshToken, userInfo) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const { _id, role } = decoded;
      const user = { _id, role };

      // console.log({
      //   name: "key service decoded",
      //   user,
      // });

      // console.log({
      //   name: "key service param",
      //   userInfo,
      //   refreshToken,
      // });

      if (user._id !== userInfo._id || user.role !== userInfo.role) {
        throw new AuthFailureError(
          "There are some things wrong with your informations"
        );
      }

      const refreshTokenUsed = await Key.findAll({
        where: {
          id_user: user._id,
        },
        attributes: ["refreshTokenUsed"],
        raw: true,
      });

      // console.log({ refreshTokenUsed });

      const refreshTokenUsedList = refreshTokenUsed.map(
        (row) => row.refreshTokenUsed
      );

      // console.log({ refreshTokenUsedList });

      if (!refreshTokenUsedList.includes(refreshToken)) {
        throw new AuthFailureError("Your are not verify 1");
      }

      const tokenPair = await this.createTokenPair(user);

      // console.log({
      //   name: "key service",
      //   tokenPair,
      // });

      if (!tokenPair) {
        throw new AuthFailureError("Your are not verify 2");
      } else {
        await this.storeRefreshToken({
          id_user: user._id,
          refreshTokenUsed: tokenPair.refreshToken,
        });
        return tokenPair;
      }
    } catch (error) {
      return error;
    }
  }

  static async deleteKeyByIdUser(id_user) {
    return await Key.destroy({
      where: {
        id_user: id_user,
      },
    });
  }
}

module.exports = KeyService;
