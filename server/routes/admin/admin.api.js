"use strict";

const express = require("express");

const router = express.Router();

router.use("/add-utility", require("./admin.api"));

module.exports = router;
