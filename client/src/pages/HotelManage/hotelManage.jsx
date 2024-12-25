import "./css/hotelManage.css";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import React, { useState } from "react";
import Header from "./Header";
import Slidebar from "./SideBar";

const HotelManage = () => {
  const isLoggedIn = useSelector((useState) => useState.auth.login.currentUser);

  if (!isLoggedIn) return <Navigate to={"/"} replace={true} />;
  return (
    <div className="hotelManagerContainer">
      {/* left component */}
      <div className="HotelM-l">
        <Slidebar />
      </div>

      {/* right component */}
      <div className="HotelM-r">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default HotelManage;
