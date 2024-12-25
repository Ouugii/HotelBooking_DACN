import React, { useState } from "react";
import "./css/createpost.css";
import CrPost_Address from "./CreatePost_Components/CrPost_Address";
import CrPost_OverView from "./CreatePost_Components/CrPost_OverView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const Createpost = () => {
  //   const [payLoad, SetpayLoad] = useState({
  //     categoryCode: '',
  //     title: '',
  //     start: '',
  //     price: 0,
  //     image:'',
  //     address:'',
  // });
  return (
    <div className="CreatePost-Container">
      <h1 className="CreatePost-Header">Đăng tin mới</h1>
      <div className="CreatePost-Content">
        <CrPost_Address />
        <CrPost_OverView />
        <div style={{ paddingTop: "30px" }}>
          <h2 className="Address_title">Hình ảnh</h2>
          <small>Cập nhật hình ảnh</small>
          <div>
            <label
              style={{
                borderRadius: "5px",
                width: "100%",
                border: "dashed 2px",
                height: "300px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
              htmlFor="file"
            >
              <FontAwesomeIcon
                style={{ fontSize: "100px", color: "#003580" }}
                icon={faCamera}
              />
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "400",
                  color: "#003580",
                }}
              >
                Thêm ảnh
              </span>
            </label>
            <input hidden type="file" id="file" />
          </div>
        </div>
        <div style={{ height: "300px" }}></div>
      </div>
    </div>
  );
};

export default Createpost;
