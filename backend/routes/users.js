const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/", (req, res) => {
  //res.status(200).json(["ana", "ana@gmail.com", "123456789"]);
  User.find({})
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(400).json(error));
});

module.exports = router;
