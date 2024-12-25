import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import "./user.css";
import React from "react";
import axios from "axios";
import Navbars from "../../components/navbar/navBar";
import Offer from "../../components/offer/offer";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/Mail.List";

import { faBell } from "@fortawesome/free-solid-svg-icons";
const User = () => {
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
          "http://localhost:3030/v2/api/user/order",
          { headers }
        );

        SetOrders(response.data.metadata.foundListOrder);
        console.log(orders);
        const ids = response.data.metadata.foundListOrder.map(
          (order) => order._id
        );
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
            `http://localhost:3030/v2/api/user/order/detail/${selectedOrderId}`,
            { headers }
          );

          setOrderDetails(response.data.metadata.foundOrder);
          console.log(orderDetails);
        } catch (error) {
          console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
        }
      };

      fetchOrderDetails();
    }
  }, [selectedOrderId]);

  const cancelOrder = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      };
      const response = await axios.put(
        `http://localhost:3030/v2/api/user/order/cancel/${selectedOrderId}`,
        {},
        { headers }
      );

      console.log("Gui du lieu thanh cong:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  const handleOrderClick = (orderId) => {
    setSelectedOrderId(orderId);
    setOpen(true);
  };

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
      <Navbars />
      <div className="header_user">
        <img src="/IMG/Home/user_ord.jpg" alt="" />
      </div>
      <div className="OrderUserContainer">
        <h1 style={{ letterSpacing: "1px", fontWeight: "400" }}>
          Conveniently and easily manage your orders
        </h1>
      </div>

      <div className="OrderUserContainer">
        <div className="container-fluid m-0 p-0 px-0 ">
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 left">
              <div className="adv-offer">
                <img
                  className="offer-img"
                  src="/IMG/Home/ordOffer1.jpg"
                  alt=""
                />
                <div className="colorFetch"></div>
                <div className="User-offer-content">
                  <h1 className="content-hd">Special offers just for you</h1>
                  <p className="dsc">
                    Save an extra 10% when you share MidmoonBooking with your
                    family and friend
                  </p>
                  <button className="button-hd">Share</button>
                </div>
              </div>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 right">
              <div className="adv-offer">
                <img
                  className="offer-img"
                  src="/IMG/Home/ordOffer2.jpg"
                  alt=""
                />
                <div className="colorFetch"></div>
                <div className="User-offer-content">
                  <h1 className="content-hd">Special offers just for you</h1>
                  <p className="dsc">
                    Save 15% and more when booking more than 4 rooms
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="homeDecrip">
          <div className=" ">
            <p style={{ fontSize: "18px", fontWeight: "500" }}>
              All Your orders:
            </p>
          </div>
          <div className="nofition-ord">
            <div className="nofition_content">
              <p style={{ fontWeight: "600" }}>
                <FontAwesomeIcon icon={faBell} /> Note :{" "}
              </p>
              <p>
                Consent to cancel an order is prior{" "}
                <span style={{ fontWeight: "600" }}>24 hours</span> before
                receiving room, after this period you will not be able to cancel
                the room and refunds, to learn more check out our guest policies
                our goods
              </p>
              <a
                style={{ position: "absolute", right: "20px", bottom: "5px" }}
                href=""
              >
                learn more
              </a>
            </div>
          </div>
          <div className="table-ord">
            <table className="w-full table-fixed">
              <thead style={{ textAlign: "center" }}>
                <tr className="py-2">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Start day</th>
                  <th className="border p-2">End day</th>
                  <th className="border p-2">total price</th>
                  <th className="border p-2"></th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 &&
                  orders.map((order) => {
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
                              Edit
                            </button>
                          </div>
                        </th>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {/* hiển thị khi nhấn chỉnh sửa  */}
        {open && orderDetails && (
          <div className="ordered_opt" onClick={() => setOpen(false)}>
            <div
              className="Create-Ord"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="ordered-details">
                <h1 style={{ fontSize: "20px", paddingBottom: "10px" }}>
                  Order detail{" "}
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "green",
                    }}
                  >
                    {" "}
                    {"("}View only <FontAwesomeIcon icon={faEye} />
                    {")"}
                  </span>
                  :
                </h1>
                <div style={{ display: "flex" }}>
                  <div className="ordered-detail-L">
                    <p>ID:</p>
                    <p>Status:</p>
                    <p>Start day:</p>
                    <p>End day:</p>
                    <p>Price:</p>
                    <button
                      style={{
                        padding: "2px",
                        backgroundColor: "orange",
                        borderRadius: "5px",
                        fontWeight: 500,
                      }}
                      onClick={cancelOrder}
                    >
                      Cancel order
                    </button>
                  </div>
                  <div className="ordered-detail-UR">
                    <p>{orderDetails._id}</p>
                    <p
                      className={`font-semibold ${getStatusColor(
                        orderDetails.status
                      )}`}
                    >
                      {orderDetails.status}
                    </p>
                    <p>
                      {new Date(orderDetails.start_day).toLocaleDateString()}
                    </p>
                    <p>{new Date(orderDetails.end_day).toLocaleDateString()}</p>
                    <p>{orderDetails.total_price}</p>
                  </div>
                  <div></div>
                </div>
                <img className="ord-use-img" src="/IMG/Home/Y.png" alt="" />
              </div>
            </div>
          </div>
        )}
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default User;
