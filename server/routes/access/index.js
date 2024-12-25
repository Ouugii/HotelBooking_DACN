"use strict";

const express = require("express");
const asyncHandler = require("express-async-handler");

const router = express.Router();

const AccessController = require("../../controller/access.controller");
const { verifyToken } = require("../../middleware/auth.middleware");

router.post("/user/register", asyncHandler(AccessController.signUp));
router.post("/user/login", asyncHandler(AccessController.login));

router.use(verifyToken);
// use authen midleware

router.post("/user/refesh", asyncHandler(AccessController.refresh));
router.delete("/user/logout", asyncHandler(AccessController.logout));

module.exports = router;
