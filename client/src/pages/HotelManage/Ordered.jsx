import React from "react";
import "./css/odered.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Ordered = () => {
  const state = useSelector((useState) => useState.auth.login.currentUser);
  const accessToken = state?.metadata.accessToken;
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom] = useState(null);
  const [orders, SetOrders] = useState([]);
  const [orderIds, setOrderIds] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedOrderId2, setSelectedOrderId2] = useState(null);
  //lay du lieu order
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        };
        const response = await axios.get(
          "http://localhost:3030/v2/api/hotel-manage/order",
          { headers }
        );

        SetOrders(response.data.metadata.orders);
        const ids = response.data.metadata.orders.map((order) => order._id);
        setOrderIds(ids);
        console.log(orderIds);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phòng:", error);
      }
    };

    fetchOrders();
  }, []);

  // lay order details
  useEffect(() => {
    if (selectedOrderId !== null) {
      const fetchOrderDetails = async () => {
        try {
          const headers = {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
          };
          const response = await axios.get(
            `http://localhost:3030/v2/api/hotel-manage/order/detail/${selectedOrderId}`,
            { headers }
          );

          setOrderDetails(response.data.metadata);
          console.log(orderDetails);
        } catch (error) {
          console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
        }
      };

      fetchOrderDetails();
    }
  }, [selectedOrderId]);

  const handleOrderClick = (orderId) => {
    setSelectedOrderId(orderId);
    setOpen(true);
  };

  //checkout cho order
  const handleCheckout = async (orderId) => {
    if (orderId !== null) {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        };
        const response = await axios.put(
          `http://localhost:3030/v2/api/hotel-manage/order/check-out/${orderId}`,
          {},
          { headers }
        );

        if (response.status === 200) {
          alert("Check-out thành công!");
          window.location.reload();
        }
      } catch (error) {
        console.error("Lỗi khi thực hiện check-out:", error);
        alert("Lỗi khi thực hiện check-out. Vui lòng thử lại.");
      }
    }
  };

  const handleOrdercheckout = (orderId) => {
    handleCheckout(orderId);
  };
  //add room cho order
  const handleRoomSelection = async (room) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      };

      const response = await axios.post(
        `http://localhost:3030/v2/api/hotel-manage/order/${selectedOrderId2}/add-room`,
        {
          id_room: room._id,
          start_day: orderDetails.start_day,
          end_day: orderDetails.end_day,
          total_price: room.price,
        },
        { headers }
      );
      alert("thêm phòng thành công");
      console.log("Phòng đã được thêm ", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi thêm phòng vào đơn hàng:", error);
    }
  };

  const handleOpen2 = (orderId2) => {
    setSelectedOrderId2(orderId2);
    setOpen2(true);
    console.log(selectedOrderId2);
  };

  //Lay data phòng

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        };
        const response = await axios.get(
          "http://localhost:3030/v2/api/hotel-manage/room/available",
          { headers }
        );

        setRooms(response.data.metadata.foundRooms);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phòng:", error);
      }
    };

    fetchRooms();
  }, []);

  //màu chữ
  const getStatusColor = (status) => {
    switch (status) {
      case "ON_ORDER":
        return "text-blue-500";
      case "PRE_ORDER":
        return "text-yellow-500";
      case "CANCEL":
        return "text-red-500";
      case "DONE":
        return "text-green-500";
      default:
        return ""; // default text color
    }
  };

  return (
    <div>
      <div className="p-7">
        <h1 className="CreatePost-Header">Quản lí đơn</h1>
      </div>

      <table className="w-full table-fixed">
        <thead style={{ textAlign: "center" }}>
          <tr className="py-2">
            <th className="border p-2">ID</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Ngày bắt đầu</th>
            <th className="border p-2">Ngày kết thúc</th>
            <th className="border p-2">Tổng tiền</th>
            <th className="border p-2"></th>
          </tr>
        </thead>
        <tbody>
          {Object.values(orders).map((order) => {
            //CHuyen ngay
            const startDate = new Date(order.start_day);
            const endDate = new Date(order.end_day);
            const formatDate = (date) => {
              const day = date.getDate();
              const month = date.getMonth() + 1;
              const year = date.getFullYear();
              return `${day}/${month}/${year}`;
            };
            //tinh so ngay thue và tính tiền

            return (
              <tr
                style={{ textAlign: "center", fontSize: "13px" }}
                key={order._id}
              >
                <th className="border p-2 font-normal">{order._id}</th>
                <th
                  className={`border p-2 font-normal font-semibold ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </th>

                <th className="border p-2 font-normal">
                  {formatDate(startDate)}
                </th>
                <th className="border p-2 font-normal">
                  {formatDate(endDate)}
                </th>
                <th className="border p-2 font-normal">
                  {order.total_price} VNĐ
                </th>
                <th className="border p-2 font-normal text-blue-700">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      className="border-b-2 border-blue-700"
                      onClick={() => handleOrderClick(order._id)}
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      className="border-b-2 border-blue-700"
                      onClick={() => handleOrdercheckout(order._id)}
                    >
                      Check out
                    </button>
                  </div>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* hiển thị khi nhấn chỉnh sửa  */}
      {open && orderDetails && (
        <div className="ordered_opt" onClick={() => setOpen(false)}>
          <div
            className="Create-Ord"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="ordered-detail">
              <h1 style={{ fontSize: "20px", paddingBottom: "10px" }}>
                Chi tiết đơn đặt
                <span style={{ fontSize: "12px", fontWeight: "400" }}>
                  {" "}
                  {"("}Chỉ xem{")"}
                </span>
                :
              </h1>
              <div style={{ display: "flex" }}>
                <div className="ordered-detail-L">
                  <p>ID:</p>
                  <p>Trạng thái:</p>
                  <p>Ngày bắt đầu:</p>
                  <p>Ngày kết thúc:</p>
                  <p>Tổng tiền:</p>
                </div>
                <div className="ordered-detail-R">
                  <p>{orderDetails._id}</p>
                  <p
                    className={`font-semibold ${getStatusColor(
                      orderDetails.status
                    )}`}
                  >
                    {orderDetails.status}
                  </p>
                  <p>{new Date(orderDetails.start_day).toLocaleDateString()}</p>
                  <p>{new Date(orderDetails.end_day).toLocaleDateString()}</p>
                  <p>{orderDetails.total_price}</p>
                </div>
              </div>
            </div>
            <div className="addRoom-ord">
              <div className="addRoom-ord-content">
                <h1 style={{ fontSize: "20px", marginBottom: "0" }}>
                  Thêm phòng cho đơn đặt
                </h1>
                <FontAwesomeIcon
                  style={{ color: "green", cursor: "pointer" }}
                  icon={faPlus}
                  onClick={() => handleOpen2(orderDetails._id)}
                />
              </div>
              <div>{/* Hiển thị danh sách các phòng đã chọn */}</div>
            </div>
          </div>
        </div>
      )}

      {/* hiển thị khi nhấn thêm phòng */}
      {open2 && (
        <div className="ordered_opt" onClick={() => setOpen2(false)}>
          <div
            className="Create-Ord2"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h1 style={{ fontSize: "20px", paddingBottom: "10px" }}>
              Chi tiết các phòng:{" "}
            </h1>
            <div className="room-box">
              <table className="w-full table-fixed">
                <thead style={{ textAlign: "center" }}>
                  <tr className="py-2">
                    <th className="border p-2">Số phòng</th>
                    <th className="border p-2">Giá</th>
                    <th className="border p-2">Loại phòng</th>
                    <th className="border p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {/* api lấy tất cả các phòng */}
                  {Object.values(rooms).map((room) => (
                    <tr
                      key={room._id}
                      style={{ textAlign: "center", fontSize: "13px" }}
                    >
                      <th className="border p-2 font-normal">
                        {room.room_number}
                      </th>
                      <th className="border p-2 font-normal">{room.price}</th>
                      <th className="border p-2 font-normal">
                        {room.type_name}
                      </th>

                      <th className="flex justify-center items-center gap-2 p-2 font-normal text-blue-700">
                        <button
                          className="border-b-2 border-blue-700"
                          onClick={() => handleRoomSelection(room)}
                        >
                          chọn
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ordered;
