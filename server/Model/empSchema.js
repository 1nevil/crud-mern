const mongoose = require("mongoose");

const empSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dept: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const emp = mongoose.model("emp", empSchema);

module.exports = emp;
