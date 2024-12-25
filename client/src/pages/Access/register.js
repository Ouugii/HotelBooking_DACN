import React from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
const { useState } = require("react");

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLG = () => {
    navigate("/lg");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3030/v1/api/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Data sent successfully");
        navigate("/lg");
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="background2"></div>
      <div className="bg2">
        <div className="content2">
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
        <div className="logreg-box2">
          <div className="form-box login">
            <form onSubmit={handleSubmit}>
              <h2>Register</h2>
              <div className="imput-box">
                <input
                  onChange={handleChange}
                  name="email"
                  type="email"
                  id="form3Example3c"
                  className="form-control"
                  placeholder="Email"
                />

                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  id="form3Example4c"
                  className="form-control"
                  placeholder="Mật Khẩu"
                />
                <button type="submit" className="btn btn-primary btn-lg">
                  Tạo Tài Khoản
                </button>
              </div>
              <div className="login-register">
                <p>
                  Already have an account? <span onClick={handleLG}>Login</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
