import "./propertyList.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const PropertyList = ({ headerData }) => {
  // Đảo ngược việc gọi handleSearch ngay khi render
  const navigate = useNavigate();
  const handleSearch = (destination, code) => {
    navigate("/hotels", {
      state: {
        destination: destination,
        date: headerData.date,
        options: headerData.options,
        code_destination: code,
        startDate: headerData.daystart,
        endDate: headerData.dayend,
      },
    });
  };

  return (
    <div id="slider" className="slide">
      <div className="pList">
        <div className="pListItem" onClick={() => handleSearch("Da lat", "68")}>
          <img src="/IMG/Home/Dalat2.jpg" alt="" className="pListImg" />
          <div className="pListTitles">
            <h1>Da lat</h1>
            <h2 style={{ fontWeight: "500", color: "#003580" }}>
              See all offer
            </h2>
          </div>
        </div>

        <div
          className="pListItem"
          onClick={() => handleSearch("Vung tau", "77")}
        >
          <img src="/IMG/Home/Vungtau.jpg" alt="" className="pListImg" />
          <div className="pListTitles">
            <h1>Vung tau</h1>
            <h2 style={{ fontWeight: "500", color: "#003580" }}>
              See all offer
            </h2>
          </div>
        </div>

        <div
          className="pListItem"
          onClick={() => handleSearch("Da nang", "48")}
        >
          <img src="/IMG/Home/Danang.jpg" alt="" className="pListImg" />
          <div className="pListTitles">
            <h1>Da nang</h1>
            <h2 style={{ fontWeight: "500", color: "#003580" }}>
              See all offer
            </h2>
          </div>
        </div>

        <div
          className="pListItem"
          onClick={() => handleSearch("Nha trang", "56")}
        >
          <img src="/IMG/Home/Nhatrang.jpg" alt="" className="pListImg" />
          <div className="pListTitles">
            <h1>Nha trang</h1>
            <h2 style={{ fontWeight: "500", color: "#003580" }}>
              See all offer
            </h2>
          </div>
        </div>

        <div
          className="pListItem"
          onClick={() => handleSearch("Ho chi minh", "79")}
        >
          <img src="/IMG/Home/HoChiMinh.jpg" alt="" className="pListImg" />
          <div className="pListTitles">
            <h1>Ho Chi Minh City</h1>
            <h2 style={{ fontWeight: "500", color: "#003580" }}>
              See all offer
            </h2>
          </div>
        </div>

        <div className="pListItem" onClick={() => handleSearch("Ha noi", "01")}>
          <img src="/IMG/Home/Hanoi.jpg" alt="" className="pListImg" />
          <div className="pListTitles">
            <h1>Ha Noi</h1>
            <h2 style={{ fontWeight: "500", color: "#003580" }}>
              See all offer
            </h2>
          </div>
        </div>

        <div className="pListItem" onClick={() => handleSearch("Hue", "46")}>
          <img src="/IMG/Home/hue.jpg" alt="" className="pListImg" />
          <div className="pListTitles">
            <h1>Hue</h1>
            <h2 style={{ fontWeight: "500", color: "#003580" }}>
              See all offer
            </h2>
          </div>
        </div>

        <div
          className="pListItem"
          onClick={() => handleSearch("Phan thiet", "60")}
        >
          <img src="/IMG/Home/Phanthiet.jpg" alt="" className="pListImg" />
          <div className="pListTitles">
            <h1>Phan Thiet</h1>
            <h2 style={{ fontWeight: "500", color: "#003580" }}>
              See all offer
            </h2>
          </div>
        </div>

        <div className="pListItem" onClick={() => handleSearch("Hoi an", "49")}>
          <img src="/IMG/Home/HoiAn.jpg" alt="" className="pListImg" />
          <div className="pListTitles">
            <h1>Hoi An</h1>
            <h2 style={{ fontWeight: "500", color: "#003580" }}>
              See all offer
            </h2>
          </div>
        </div>

        <div
          className="pListItem"
          onClick={() => handleSearch("Vung tau", "77")}
        >
          <img src="/IMG/Home/MuiNe.jpg" alt="" className="pListImg" />
          <div className="pListTitles">
            <h1>Mui ne</h1>
            <h2 style={{ fontWeight: "500", color: "#003580" }}>
              See all offer
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
