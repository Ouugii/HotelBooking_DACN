"use strict";

const db = require("../models");
const {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
} = require("../core/error.response");
const { getInfoData } = require("../utils");

class UserOrderService {
  static async makeOrder(userId, payload) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDay = new Date(payload.start_day);
    const endDay = new Date(payload.end_day);

    if (startDay < today) {
      throw new BadRequestError("ERR: start day cannot be in the past");
    }

    if (endDay < startDay) {
      throw new BadRequestError(
        "ERR: end day must be equal to or later than start_day"
      );
    }
    const makedOrder = await db.Order.create({
      id_user: userId,
      id_hotel: payload.id_hotel,
      start_day: payload.start_day,
      end_day: payload.end_day,
      status: "PRE_ORDER",
      total_room: payload.total_room,
      total_price: payload.total_price,
      total_person: payload.total_person,
    });

    if (!makedOrder) {
      throw new NotFoundError("Error: Can make order");
    }

    if (makedOrder) {
      return {
        order: makedOrder,
      };
    }
  }

  static async getAllOrder(userId) {
    const foundListOrder = await db.Order.findAll({
      where: {
        id_user: userId,
      },
    });

    if (!foundListOrder) {
      throw new NotFoundError("ERR: Can not find order detail for user");
    }

    return {
      foundListOrder,
    };
  }

  static async getOrderDetail(userId, orderId) {
    const foundOrder = await db.Order.findOne({
      where: {
        _id: orderId,
        id_user: userId,
      },
      include: [
        {
          model: db.RoomOrder,
          include: [db.Room],
        },
      ],
    });

    if (!foundOrder) {
      throw new NotFoundError("ERR: Can not find order detail for user");
    }

    return {
      foundOrder,
    };
  }

  static async updateOrder(userId, orderId, payload) {
    const hotelId = await HotelManagerService.getHotelIdForOwner(userId);

    const foundOrder = await db.Order.findOne({
      where: { _id: orderId, id_hotel: hotelId },
    });

    if (!foundOrder) {
      throw new NotFoundError("ERR: Can not find order for your hotel");
    }

    const updateedOrder = await foundOrder.update({
      status: payload.status,
      total_price: payload.total_price,
      start_day: payload.start_day,
      end_day: payload.end_day,
      total_person: payload.total_person,
      total_room: payload.total_room,
    });

    if (!foundOrder) {
      throw new BadRequestError("ERR: Can not update order for your hotel");
    }

    return {
      updateedOrder,
    };
  }

  static async cancelOrder(userId, orderId) {
    const foundOrder = await db.Order.findOne({
      where: {
        _id: orderId,
        id_user: userId,
      },
    });

    if (!foundOrder) {
      throw new NotFoundError("ERR: Can not find the order for user");
    }

    const cancelOrder = await foundOrder.update({
      status: "CANCEL",
    });

    if (!cancelOrder) {
      throw new NotFoundError("ERR: Can not cancal this order for user");
    }

    return {
      cancelOrder,
    };
  }

  static async makeRating(userId, orderId, payload) {
    const foundOrder = await db.Order.findOne({
      where: {
        _id: orderId,
        id_user: userId,
      },
    });

    if (!foundOrder) {
      throw new NotFoundError("ERR: Can not find the order for user");
    }

    if (foundOrder.status !== "DONE") {
      throw new ForbiddenError("ERR: This order is not checked out");
    }

    const existingRating = await db.Rating.findOne({
      where: {
        id_order: orderId,
        id_user: userId,
      },
    });

    if (existingRating) {
      throw new ForbiddenError(
        "ERR: This order already has a rating by the user"
      );
    }

    const newRating = db.Rating.create({
      id_hotel: foundOrder.id_hotel,
      id_user: userId,
      id_order: orderId,
      comment: payload.comment,
      rating_point: payload.rating_point,
    });

    if (!newRating) {
      throw new ForbiddenError("ERR: Can not make rating for this order");
    }

    return newRating;
  }
}

module.exports = UserOrderService;
