const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const AddressController = require("../../controller/address.controller");

router
  .get("/", asyncHandler(AddressController.getProvinces))
  .get(
    "/district/:province_code",
    asyncHandler(AddressController.getDistrictsByProvinceCode)
  )
  .get(
    "/ward/:district_code",
    asyncHandler(AddressController.getWardsByDistrictCode)
  )
  .get("/test", (req, res) => {
    res.send("TEST API V2 FOR ADDRESS");
  });

module.exports = router;
