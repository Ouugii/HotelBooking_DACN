const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const _testController = require("../../controller/_test.controller");

router.post("/post-method", asyncHandler(_testController.testPostMethod));

module.exports = router;
