const express = require("express");
const router = express.Router();
const emp = require("../Model/empSchema");

router.get("/read", async (req, res) => {
  try {
    const data = await emp.find({});
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    console.log("Error in read " + error);
    res.status(400).send({ message: error });
  }
});

router.post("/insert", async (req, res) => {
  const { name, email, password, dept } = req.body;
  try {
    const empData = new emp({
      name,
      email,
      password,
      dept,
    });
    await empData.save();
    console.log(empData);
    res.status(200).send(empData);
  } catch (error) {
    console.log("Error in inserted data " + error);
    res.status(400).send({ message: error });
  }
});

router.post("/delete", async (req, res) => {
  const { _id } = req.body;
  try {
    const response = await emp.deleteOne({ _id });
    console.log(response);
    res.status(200).send(response);
  } catch (error) {
    console.log("error in deleting emp" + error);
    res.status(400).send({ message: error });
  }
});

router.post("/update", async (req, res) => {
  const { _id, name, email, password, dept } = req.body;
  try {
    const data = await emp.findOne({ _id });
    console.log(data);
    data.name = name;
    data.email = email;
    data.password = password;
    data.dept = dept;
    await data.save();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
});

module.exports = router;
