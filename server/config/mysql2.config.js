"use strict";

require("dotenv").config();
const mysql2 = require("mysql2/promise");

// db Singleton

class DatabaseSingleton {
  constructor() {
    if (!Database.instance) {
      this.connection = mysql2.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });

      Database.instance = this;
    }

    return Database.instance;
  }

  static async getConnection() {
    return this.connection;
  }
}

module.exports = DatabaseSingleton;
