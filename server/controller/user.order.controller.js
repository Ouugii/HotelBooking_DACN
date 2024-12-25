"use strict";

const { OK } = require("../core/success.response");
const UserOrderService = require("../services/user.order.service");

class UserOrderController {
  makeOrder = async (req, res, next) => {
    new OK({
      message: "Make order OK",
      metadata: await UserOrderService.makeOrder(req._id, req.body),
    }).send(res);
  };

  getAllOrder = async (req, res, next) => {
    new OK({
      message: "Get all order OK",
      metadata: await UserOrderService.getAllOrder(req._id, req.body),
    }).send(res);
  };

  getOrderDetail = async (req, res, next) => {
    new OK({
      message: "Get detail order OK",
      metadata: await UserOrderService.getOrderDetail(
        req._id,
        req.params.orderId
      ),
    }).send(res);
  };

  updateOrder = async (req, res, next) => {
    new OK({
      message: "update order OK",
      metadata: await UserOrderService.updateOrder(req._id, req.params.orderId),
    }).send(res);
  };

  cancelOrder = async (req, res, next) => {
    new OK({
      message: "Cancel order OK",
      metadata: await UserOrderService.cancelOrder(req._id, req.params.orderId),
    }).send(res);
  };

  makeRating = async (req, res, next) => {
    new OK({
      message: "make rating order OK",
      metadata: await UserOrderService.makeRating(
        req._id,
        req.params.orderId,
        req.body
      ),
    }).send(res);
  };
}

module.exports = new UserOrderController();
