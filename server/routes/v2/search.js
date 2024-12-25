"use strict";

const express = require("express");
const asyncHandler = require("express-async-handler");
const AddressController = require("../../controller/address.controller");
const router = express.Router();

router
  .get("/", (req, res) => {
    console.log(req.query);
    res.json(req.query);
  })
  .get("/place", asyncHandler(AddressController.searchPlace));

module.exports = router;
