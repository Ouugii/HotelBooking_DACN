const express = require("express");
const router = express.Router();

router
  .get("/", (req, res) => {
    res.send("API V2");
  })
  .use("/user", require("./user"))
  .use("/hotel-manage", require("./hotel.manager"))
  .use("/hotel", require("./hotel"))
  .use("/province", require("./address"))
  .use("/admin", require("./admin"))
  .use("/test", require("./_api.test"))
  .use("/search", require("./search"));

module.exports = router;
