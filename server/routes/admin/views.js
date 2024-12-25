"use strict";

const express = require("express");
const {
  verifyToken,
  verifyAdminAuth,
} = require("../../middleware/auth.middleware");
const AdminControler = require("../../controller/admin.controler");

const router = express.Router();

//#region GET - views
// router.use(verifyToken, verifyAdminAuth);

const routes = [
  "/hotel",
  "/user",
  // "/utility",
  // "/post",
  "/review",
  // "/discount",
];

router.get("/", (req, res) => {
  res.render("admin");
});

router.use(AdminControler.getModel);
router.use(AdminControler.getModelCols);

routes.forEach((r) => {
  router.get(r, AdminControler.getManageView);
});

//#endregion

module.exports = router;
