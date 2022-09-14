const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    URI = process.env.MONGODB_URI;
    await mongoose.connect(URI);
    console.log("DataBase connected successfully");
  } catch (err) {
    console.log(`error in database connection ${err}`);
  }
};

module.exports = dbConnection();
