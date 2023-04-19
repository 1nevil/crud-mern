const express = require("express");
const app = express();
require("dotenv").config();
const database = require("./Database/db");
var morgan = require("morgan");
const model = require("./Model/empSchema");
var cors = require("cors");

//morgan for api req
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
//Database connection
database.dbConnection;

app.use("/emp", require("./Routers/empRoute"));

app.get("/", (req, res) => {
  res.send("hello");
});

process.on("uncaughtException", function (err) {
  console.log(err);
});

PORT = process.env.PORT;

//server
app.listen(PORT, (err) => {
  err
    ? console.log(`error in server ${err} `)
    : console.log(`Server started on port no ${PORT}`);
});
