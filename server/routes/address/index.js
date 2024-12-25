"use strict";

const express = require("express");
const asyncHandler = require("express-async-handler");
const AddressController = require("../../controller/address.controller");

const router = express.Router();

router.get("/province", asyncHandler(AddressController.getProvinces));
router.get(
  "/province/district/:province_code",
  asyncHandler(AddressController.getDistrictsByProvinceCode)
);
router.get(
  "/province/ward/:district_code",
  asyncHandler(AddressController.getWardsByDistrictCode)
);

module.exports = router;
