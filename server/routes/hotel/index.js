"use strict";

const express = require("express");
const asyncHandler = require("express-async-handler");

const router = express.Router();

const HotelController = require("../../controller/hotel.controller");

router.post("/hotel/register", asyncHandler(HotelController.createHotel));

module.exports = router;
