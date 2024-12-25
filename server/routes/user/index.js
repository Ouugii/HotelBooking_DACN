"use strict";

const express = require("express");
const asyncHandler = require("express-async-handler");
const UserController = require("../../controller/user.controller");
const { verifyToken } = require("../../middleware/auth.middleware");

const router = express.Router();

// use authen midleware
router.use(verifyToken);

router.get("/user/:_id", asyncHandler(UserController.getUserInfo));

module.exports = router;
