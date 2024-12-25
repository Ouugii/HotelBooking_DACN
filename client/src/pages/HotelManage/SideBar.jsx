import React from "react";
import "./css/slideBar.css";
import menuSidebar from "./API clone/menuSidebar";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../pages/redux/apiRequest";
import { useNavigate } from "react-router-dom";
const activeStyle = "active";
const noActiveStyle = "sliderBarItem";
const SlideBar = () => {
  const state = useSelector((useState) => useState.auth.login.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = state?.metadata.accessToken;
  //log out
  const handleLogout = () => {
    const user = {
      _id: state?.metadata.user._id,
      role: state?.metadata.user.role,
    };
    logOut(dispatch, accessToken, navigate);
  };

  return (
    <div className="slideBar">
      <span className="logoS">MidmoonBooking</span>
      {menuSidebar.map((item) => {
        return (
          <NavLink
            className={noActiveStyle}
            activeClassName={activeStyle}
            key={item.id}
            to={item?.path}
          >
            {item.text}
          </NavLink>
        );
      })}

      <div className="BtnSlidebar">
        <FontAwesomeIcon icon={faPowerOff} onClick={handleLogout} />
      </div>
    </div>
  );
};

export default SlideBar;
