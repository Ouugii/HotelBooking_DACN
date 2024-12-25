"use strict";

const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const ManagerRoomService = require("../../controller/manager.room.controller");

router
  .get("/", asyncHandler(ManagerRoomService.getAllRoom))
  .post("/add", asyncHandler(ManagerRoomService.addRoom))
  .get("/available", asyncHandler(ManagerRoomService.getavailableRoom))
  .get("/ordered", asyncHandler(ManagerRoomService.getOrderedRoom))
  .patch("/update/:roomId", asyncHandler(ManagerRoomService.updateRoom))
  .get("/detail/:roomId", asyncHandler(ManagerRoomService.getDetailRoom));

module.exports = router;
