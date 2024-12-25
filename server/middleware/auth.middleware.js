require("dotenv").config();
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { AuthFailureError } = require("../core/error.response");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
  REFRESHTOKEN: "x-rtoken-id",
};

const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.headers[HEADER.AUTHORIZATION];
  if (!token) throw new AuthFailureError("Not found token");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) throw new AuthFailureError("Invalid token");
    req.user = decoded;
    req._id = req.user._id;
    next();
  });
});

const verifyHotelAuth = (req, res, next) => {
  if (req.user.role === "HOTEL_MANAGER") {
    next();
  } else {
    throw new AuthFailureError("Insufficient privileges");
  }
};

const verifyAdminAuth = (req, res, next) => {
  if (req.user.role === "ADMIN") {
    next();
  } else {
    throw new AuthFailureError("Insufficient privileges");
  }
};

module.exports = {
  verifyToken,
  verifyAdminAuth,
  verifyHotelAuth,
};
