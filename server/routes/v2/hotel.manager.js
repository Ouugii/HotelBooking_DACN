"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const ManagerController = require("../../controller/manager.controller");
const ManagerRoomController = require("../../controller/manager.room.controller");

const {
  verifyHotelAuth,
  verifyToken,
} = require("../../middleware/auth.middleware");

const multer = require("../../config/multer.config");

router
  .get("/", (req, res) => {
    res.send("hotel manager test api");
  })
  .post("/register", asyncHandler(ManagerController.registerHotel))
  .get("/get-utility-list", asyncHandler(ManagerController.getUtilityList))

  // Auth method
  .use(verifyToken)
  .use(verifyHotelAuth)
  .get("/get-info", asyncHandler(ManagerController.getInfo))
  .post("/add-utility", asyncHandler(ManagerController.addUtility))
  .post("/add-room", asyncHandler(ManagerRoomController.addRoom))

  .post(
    "/upload-images",
    multer.array("images"),
    asyncHandler(ManagerController.uploadImages)
  )

  .use("/room", require("./hotel.manager.room"))
  .use("/order", require("./hotel.manager.order"));

module.exports = router;
