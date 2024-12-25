import React from "react";
import "./css/profile.css";
import InputReadOnly from "./CreatePost_Components/InputReadOnly";
import InputForm from "./CreatePost_Components/InputForm";
import Button from "react-bootstrap/esm/Button";
const Profile = () => {
  return (
    <div className="p-7 flex flex-col items-center">
      <h1 className="w-full text-start CreatePost-Header">
        Chỉnh sửa thông tin cá nhân
      </h1>
      <div className="w-3/5 flex  flex-col gap-3">
        <InputReadOnly label="Mã khách sạn" />
        <InputReadOnly label="Email" />
        <InputForm label="Tên hiển thị" />
        <InputForm label="Họ" />
        <InputForm label="Tên" />
        <InputForm label="Mật khẩu" />
      </div>
      <button
        style={{
          backgroundColor: "#003580",
          color: "white",
          marginTop: "20px",
          padding: "10px 25px 10px 25px",
          borderRadius: "5px",
        }}
      >
        Cập nhật
      </button>
    </div>
  );
};

export default Profile;
