// src/pages/Access/index.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./register";
import Login from "./login";

const Access = () => {
  return (
    <div>
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Access;
