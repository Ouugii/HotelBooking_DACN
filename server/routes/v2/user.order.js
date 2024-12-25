const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const UserOrderController = require("../../controller/user.order.controller");

router
  .get("/", asyncHandler(UserOrderController.getAllOrder))
  .get("/detail/:orderId", asyncHandler(UserOrderController.getOrderDetail))
  .patch("/update/:orderId", asyncHandler(UserOrderController.updateOrder))
  .put("/cancel/:orderId", asyncHandler(UserOrderController.cancelOrder))
  .post("/make-order", asyncHandler(UserOrderController.makeOrder))
  .post("/rating/:orderId", asyncHandler(UserOrderController.makeRating));
module.exports = router;
