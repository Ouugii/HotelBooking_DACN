"use strict";

const db = require("../models");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const HotelManagerService = require("./hotel.manager.service");
const ManagerRoomService = require("./manager.room.service");

class ManagerOrderService {
  static async getAllOrder(userId) {
    const hotelId = await HotelManagerService.getHotelIdForOwner(userId);

    const orderList = await db.Order.findAll({
      where: {
        id_hotel: hotelId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      // include: [
      //   {
      //     model: db.Room,
      //     through: {
      //       model: db.RoomOrder,
      //       //attributes: [],
      //     },
      //   },
      // ],
    });

    if (!orderList) {
      throw new NotFoundError("ERR: Can not get your orders");
    }

    if (orderList) {
      return {
        orders: orderList,
      };
    }
  }

  static async getDetailOrder(userId, orderId) {
    const hotelId = await HotelManagerService.getHotelIdForOwner(userId);

    const foundOrder = await db.Order.findOne({
      where: {
        _id: orderId,
        id_hotel: hotelId,
      },
      include: [
        {
          model: db.Room,
          through: {
            model: db.RoomOrder,
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "is_ordered"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!foundOrder) {
      throw new NotFoundError("Error: Can not get order detail");
    }

    return foundOrder;
  }

  static async getOrderWithStatus(userId, status) {
    const hotelId = await HotelManagerService.getHotelIdForOwner(userId);

    const foundOrder = await db.Order.findAll({
      where: {
        id_hotel: hotelId,
        status: status,
      },
    });

    if (!foundOrder) {
      throw new BadRequestError("Error: Can not get order with status");
    }

    return {
      orders: foundOrder,
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

  static async addRoomToOrder(userId, orderId, payload) {
    const transaction = await db.sequelize.transaction();

    try {
      const hotelId = await HotelManagerService.getHotelIdForOwner(userId);

      // Find the order
      let foundOrder = await db.Order.findOne({
        where: { _id: orderId, id_hotel: hotelId },
        transaction,
      });

      if (!foundOrder) {
        throw new NotFoundError("ERR: Cannot find order for your hotel");
      }

      if (foundOrder.status === "DONE") {
        throw new NotFoundError("ERR: This order is DONE can not update");
      }

      if (foundOrder.status === "PRE_ORDER") {
        foundOrder = await foundOrder.update(
          { status: "ON_ORDER" },
          { transaction }
        );
      }

      let room = await db.Room.findOne({
        where: { _id: payload.id_room, id_hotel: hotelId },
        transaction,
      });

      if (!room) {
        throw new NotFoundError("ERR: Room not found");
      }

      if (room.is_ordered) {
        throw new NotFoundError("ERR: This room is ordered");
      }

      if (!room.is_ordered) {
        await room.update({ is_ordered: true }, { transaction });
      }

      const newRoomOrder = await db.RoomOrder.create(
        {
          id_order: orderId,
          id_room: payload.id_room,
          start_day: payload.start_day,
          end_day: payload.end_day,
          total_price: payload.total_price,
        },
        { transaction }
      );

      if (!newRoomOrder) {
        throw new NotFoundError("ERR: Cannot create Room Order");
      }

      //const updatedOrder = await this.updatePrice(userId, orderId);

      await transaction.commit();

      await this.updatePrice(userId, orderId);

      // if (!newRoomOrder) {
      //   throw new BadRequestError("ERR: Can not update price for order");
      // }

      // if (newRoomOrder) {
      // }
      return { newRoomOrder };
    } catch (error) {
      if (transaction.finished !== "commit") {
        await transaction.rollback();
      }
      throw error;
    }
  }

  static async updatePrice(userId, orderId) {
    const foundOrder = await this.getDetailOrder(userId, orderId);

    if (!foundOrder) {
      throw new NotFoundError("ERR: Can not get order detail");
    }

    const rooms = foundOrder.Rooms;

    // console.log("id_hotel: ", JSON.stringify(foundOrder.id_hotel, null, 2));
    // console.log(foundOrder);
    // console.log("Rooms Lenght::::::" + rooms.length);

    if (!rooms) {
      throw new NotFoundError("ERR: No rooms found in the order");
    }

    const total_day = foundOrder.total_day;
    let price = 0;

    rooms.forEach((r) => {
      price += r.price * total_day;
    });

    // console.log("price::::::::::" + price);

    const updatedOrder = await foundOrder.update({
      total_price: price,
    });

    if (!updatedOrder) {
      throw new NotFoundError("ERR: Can not update price of order");
    }

    return updatedOrder;
  }

  static async removeRoomFromOrder(userId, orderId) {
    const foundOrder = await this.getDetailOrder(userId, orderId);

    const removedRoom = db;
  }

  static async checkOutOrder(userId, orderId) {
    const transaction = await db.sequelize.transaction();

    try {
      const hotelId = await HotelManagerService.getHotelIdForOwner(userId);

      const foundOrder = await db.Order.findOne({
        where: { _id: orderId, id_hotel: hotelId },
        include: [db.RoomOrder],
        transaction,
      });

      if (!foundOrder) {
        throw new NotFoundError("ERR: Cannot find order for your hotel");
      }

      const listRoomId = foundOrder.RoomOrders.map((room) => room.id_room);

      await Promise.all(
        listRoomId.map((roomId) =>
          ManagerRoomService.updateStatusRoom(hotelId, false, roomId)
        )
      );

      await foundOrder.update({ status: "DONE" }, { transaction });

      await transaction.commit();

      return "Check out order OK";
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = ManagerOrderService;
