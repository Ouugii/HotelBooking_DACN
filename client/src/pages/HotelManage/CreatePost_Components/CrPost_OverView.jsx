import React from "react";
import "../css/crPost_OverView.css";
import InputReadOnly from "./InputReadOnly";
import { useSelector } from "react-redux";
import InputForm from "./InputForm";
const CrPost_OverView = () => {
  const currentData = useSelector((state) => state.auth.login.currentUser);

  return (
    <div>
      <h2 className="Address_title">Thông tin mô tả</h2>
      <div className="ovv_container">
        <InputForm label="Tiêu đề" />
        <div className="ovv_content">
          <label htmlFor="desc">Nội dung mô tả</label>
          <textarea
            id="desc"
            cols="30"
            rows="10"
            className="ovv_input"
          ></textarea>
        </div>

        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            paddingTop: "30px",
          }}
        >
          <InputReadOnly
            label="Thông tin liên hệ"
            value={currentData?.metadata.userInfo.email}
          />
          <InputReadOnly label="Điện thoại" />
          <InputForm label="Giá" />
        </div>
      </div>
    </div>
  );
};

export default CrPost_OverView;
