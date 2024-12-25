"use strict";

const express = require("express");

const router = express.Router();

router.use("/", require("./views"));

router.use("/admin", (req, res) => {
  res.send("test api for admin");
});

module.exports = router;
