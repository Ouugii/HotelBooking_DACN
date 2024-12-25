"use strict";

const { BadRequestError } = require("../core/error.response");
const { OK } = require("../core/success.response");
const UserService = require("../services/user.service");

class UserController {
  getUserInfo = async (req, res, next) => {
    if (req.user._id != req.params._id) {
      throw new BadRequestError(
        "There are some things wrong with your informations"
      );
    }

    new OK({
      message: "get user info OK",
      metadata: await UserService.getUserInfoById(req.params._id),
    }).send(res);
  };

  updateUserInfo = async (req, res, next) => {
    if (req.user._id != req.params._id) {
      throw new BadRequestError(
        "There are some things wrong with your informations"
      );
    }

    new OK({
      message: "update user info OK",
      metadata: await UserService.updateUserInfo(req.params._id),
    }).send(res);
  };
}

module.exports = new UserController();
