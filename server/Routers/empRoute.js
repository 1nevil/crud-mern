const express = require("express");
const router = express.Router();
const emp = require("../Model/empSchema");

router.get("/read", async (req, res) => {
  try {
    const data = await emp.find({});
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
    res.status(200).send(empData);
  } catch (error) {
    console.log("Error in inserted data " + error);
    res.status(400).send({ message: error });
  }
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  try {
    const response = await emp.deleteOne({ id });
    res.status(200).send(response);
  } catch (error) {
    console.log("error in deleting emp" + error);
    res.status(400).send({ message: error });
  }
});

router.post("/update", async (req, res) => {
  const { id, name, email, password, dept } = req.body;
  try {
    const data = await emp.findOne({ _id: id });
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
