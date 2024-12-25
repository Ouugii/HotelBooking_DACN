const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

router.get("/test", (req, res) => {
  res.send("TEST API V2 FOR ADDRESS");
});

module.exports = router;
