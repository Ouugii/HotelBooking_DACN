"use strict";
const { OK } = require("../core/success.response");
const ManagerRoomService = require("../services/manager.room.service");

class ManagerRoomController {
  getAllRoom = async (req, res, next) => {
    new OK({
      message: "Get All Room OK",
      metadata: await ManagerRoomService.getAllRoom(req._id),
    }).send(res);
  };

  addRoom = async (req, res, next) => {
    new OK({
      message: "Add Room OK",
      metadata: await ManagerRoomService.addRoom(req._id, req.body),
    }).send(res);
  };

  updateRoom = async (req, res, next) => {
    new OK({
      message: "update Room OK",
      metadata: await ManagerRoomService.updateRoom(
        req._id,
        req.params.roomId,
        req.body
      ),
    }).send(res);
  };

  getavailableRoom = async (req, res, next) => {
    new OK({
      message: "Get Free Rooms OK",
      metadata: await ManagerRoomService.getRoomWithStatus(req._id, false),
    }).send(res);
  };

  getOrderedRoom = async (req, res, next) => {
    new OK({
      message: "Get Ordered Rooms OK",
      metadata: await ManagerRoomService.getRoomWithStatus(req._id, true),
    }).send(res);
  };

  getDetailRoom = async (req, res, next) => {
    new OK({
      message: "get detail room OK",
      metadata: await ManagerRoomService.getDetailRoom(
        req._id,
        req.params.roomId
      ),
    }).send(res);
  };
}

module.exports = new ManagerRoomController();
