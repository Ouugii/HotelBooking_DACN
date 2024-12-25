import React from "react";
import "./css/room.css";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import InputForm from "./CreatePost_Components/InputForm";
const Room = () => {
  const state = useSelector((useState) => useState.auth.login.currentUser);
  const accessToken = state?.metadata.accessToken;

  // đóng mở component
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const handleOpen = (i) => {
    setOpen(true);
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
          "http://localhost:3030/v2/api/hotel-manage/room",
          { headers }
        );

        setRooms(response.data.metadata);
        console.log(rooms);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phòng:", error);
      }
    };

    fetchRooms();
  }, []);

  //Lay data
  const [payLoad, SetpayLoad] = useState({
    room_number: "",
    type_name: "",
    price: 0,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!payLoad.room_number || !payLoad.type_name || !payLoad.price) {
      alert("Vui lòng điền đầy đủ thông tin trước khi gửi.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3030/v2/api/hotel-manage/add-room",
        payLoad,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Data sent successfully", payLoad);
        window.location.reload();
      } else {
        console.error("Failed to send data to the server");
        alert("tài khoản đã tồn tại");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    SetpayLoad((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Hiển thị
  return (
    <div>
      <div className="p-7">
        <h1 className="CreatePost-Header">Quản lý phòng</h1>
      </div>

      <div className="btn-createRoom">
        <button className="btn-createRoom-Content" onClick={() => handleOpen()}>
          Tạo phòng
        </button>
      </div>

      <table className="w-full table-fixed">
        <thead style={{ textAlign: "center" }}>
          <tr className="py-2">
            <th className="border p-2">Số phòng</th>
            <th className="border p-2">Giá</th>
            <th className="border p-2">Loại phòng (Standard/VIP)</th>
            <th className="border p-2">Trạng thái</th>

            <th className="border p-2"></th>
          </tr>
        </thead>
        <tbody>
          {Object.values(rooms).map((room) => (
            <tr
              key={room._id}
              style={{ textAlign: "center", fontSize: "13px" }}
            >
              <th className="border p-2 font-normal">{room.room_number}</th>
              <th className="border p-2 font-normal">{room.price}</th>
              <th className="border p-2 font-normal">{room.type_name}</th>
              <th
                className={`border p-2  font-semibold ${
                  room.is_ordered ? "text-red-500" : "text-green-500"
                }`}
              >
                {room.is_ordered ? "Ordered" : "Available"}
              </th>

              <th className="flex justify-center items-center gap-2 p-2 font-normal text-blue-700">
                <button className="border-b-2 border-blue-700">Chi tiết</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
        <div className="CreateRoom" onClick={() => setOpen(false)}>
          <form className="CreateRoom-Content" onSubmit={handleSubmit}>
            <div
              className="CreateRoom-Ct"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <label htmlFor="form3Example3c" style={{ fontWeight: "500" }}>
                Số phòng
              </label>
              <input
                onChange={handleChange}
                name="room_number"
                type="Type"
                id="form3Example4c"
                className="form-control"
              />

              <label htmlFor="form3Example3c" style={{ fontWeight: "500" }}>
                {"Loại phòng(STD/VIP)"}
              </label>
              <select
                id="type_name"
                className="form-control"
                value={payLoad.type_name}
                onChange={handleChange}
                name="type_name"
              >
                <option value="">Chọn loại phòng</option>
                <option value="STD">Standard</option>
                <option value="VIP">VIP</option>
              </select>

              <label htmlFor="form3Example3c" style={{ fontWeight: "500" }}>
                {"Giá tiền(VND)"}
              </label>
              <input
                onChange={handleChange}
                name="price"
                type="Type"
                id="form3Example4c"
                className="form-control"
              />

              <button type="submit" className="createRoom-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Room;
