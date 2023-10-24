const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const User = require("../models/User");

router.get("/", (req, res) => {
  Task.find({})
    .then((task) => res.status(200).json(task))
    .catch((error) => res.status(400).json(error));
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.user.email;
    const pass = req.body.user.password;
    console.log(email);
    console.log(pass);

    if (!email || !pass) {
      return res.status(400).json("Email and password are mandatory!");
    }

    const user = await User.findOne({ email });
    console.log(user);
    if (!user || pass !== user.password) {
      return res
        .status(400)
        .json("User with that email or password doesn't exists!");
    }
    /*
    if (pass !== user.password) {
      return res.status(400).json("Wrong password!");
    }*/

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
