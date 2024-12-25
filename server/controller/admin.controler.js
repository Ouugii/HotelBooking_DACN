"use strict";

const { BadRequestError, NotFoundError } = require("../core/error.response");
const { OK } = require("../core/success.response");

const {
  overview,
  detail,
  edit,
  create,
} = require("../config/admin.view.config");
const AdminService = require("../services/admin.service");

class AdminController {
  //#region ADMIN OVERVIEW
  getModel = (req, res, next) => {
    const path = req.path;
    req.model = path.charAt(1).toUpperCase() + path.slice(2);

    next();
  };

  getModelCols = async (req, res, next) => {
    // req.cols = Object.keys(await db[req.model].describe());
    req.cols = overview[req.model].display_col;
    req.database_cols = overview[req.model].database_col;

    // console.log(`getModelCols --- ${overview[req.model].database_cols}`);
    //console.log(overview[req.model].display_col);
    next();
  };

  getManageView = async (req, res, next) => {
    let info;
    switch (req.model) {
      case "Hotel":
        //  console.log(await AdminService.getHotelList());

        info = await AdminService.getHotelList();
        break;
      // return list;
      case "User":
        //  console.log(await AdminService.getUserList());

        info = await AdminService.getUserList();
        break;

      // return list;
      case "Utility":
        //  console.log(await AdminService.getUtilityList());

        info = await AdminService.getUtilityList();
        break;

      // return list;
      default:
        break;
    }

    console.log(info);

    const metadata = {
      model: req.model,
      cols: req.cols,
      database_cols: req.database_cols,
    };

    res.render("manage-overview", { metadata, info });
  };
  //#endregion

  getHotelList = async (req, res, next) => {};
}

module.exports = new AdminController();
