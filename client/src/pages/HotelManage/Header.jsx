import React from "react";
import "./css/header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../pages/redux/apiRequest";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import menuSidebar from "./API clone/menuSidebar";
const Header = () => {
  const state = useSelector((useState) => useState.auth.login.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = state?.metadata.accessToken;

  //lấy tên
  function getDisplayName(state) {
    if (!state?.metadata.userInfo.user_name) {
      return state?.metadata.userInfo.email.split("@")[0];
    }
    return state?.metadata.userInfo.user_name;
  }

  //log out
  const handleLogout = () => {
    const user = {
      _id: state?.metadata.user._id,
      role: state?.metadata.user.role,
    };
    logOut(dispatch, accessToken, navigate);
  };

  return (
    <div>
      <div>
        <div className="HeaderNav">
          <div className="navContainerHeader">
            <span className="logoHeader">Hotel Manager</span>
            <div className="navItems">
              <NavDropdown
                className="btnHeader"
                title={`Hi, ${getDisplayName(state)}`}
                id="basic-nav-dropdown"
              >
                <div className="navbtItems">
                  <NavDropdown.Item>Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    log out
                  </NavDropdown.Item>
                </div>
              </NavDropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
