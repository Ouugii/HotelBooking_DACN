import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
import "./login.css";
const Login = () => {
  const [option, setOpTion] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      option: option,
      password: password,
    };
    await loginUser(user, dispatch, navigate);
  };

  const handleRG = () => {
    navigate("/register");
  };

  return (
    <div>
      <div className="background1"></div>
      <div className="bg">
        <div className="content">
          <h2 className="logo">
            <FontAwesomeIcon icon={faCircleHalfStroke} /> MidMoonBooking
          </h2>
          <div className="text-sci">
            <h2>
              Welcome!! <br />
              <span>To our new Website</span>
            </h2>
            <p>
              For more than 20 years MidMoonBooking.com has been making it
              easier for travellers everywhere to experience the world. We
              provide an unrivalled experience for your customers and a digital
              experience optimised to drive revenue.
            </p>
          </div>
        </div>
        <div className="logreg-box">
          <div className="form-box login">
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>
              <div className="imput-box">
                <input
                  name="option"
                  type="text"
                  id="form3Example3c"
                  className="form-control"
                  placeholder="Tên Đăng Nhập Hoac Email"
                  onChange={(e) => setOpTion(e.target.value)}
                />

                <input
                  name="password"
                  type="password"
                  id="form3Example4c"
                  className="form-control"
                  placeholder="Mật Khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="butonn">
                  Đăng Nhập
                </button>
              </div>

              <div className="login-register">
                <p>
                  Don't have an account? <span onClick={handleRG}>Sign up</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
