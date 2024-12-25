"use strict";

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const handlebarsHelpers = require("handlebars-helpers");

const path = require("node:path/win32");
const app = express();
const db = require("./models");

// middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// middleware - setup cors

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,DELETE,PUT,PATCH",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

// static field
app.use(express.static(path.join(__dirname, "public")));
app.use("/modules", express.static(path.join(__dirname, "node_modules")));

// set view engine
const helpers = handlebarsHelpers();
const hbs = exphbs.create({
  helpers: helpers,
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// routes
app.use("", require("./routes"));

// check connect db

db.sequelize
  .authenticate()
  .then(() => {
    const { host, port, database } = db.sequelize.config;
    console.log(`Connection established successfully.`);
    console.log(`Host: ${host}`);
    console.log(`Port: ${port}`);
    console.log(`Database: ${database}`);
  })
  .then(() => {
    console.log("Connection closed successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// error handler
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  console.log(error.stack);
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    stack: error.stack,
    message: error.message || "Internal Error",
  });
});

module.exports = app;
