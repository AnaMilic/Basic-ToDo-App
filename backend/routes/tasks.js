const express = require("express");
const router = express.Router();

const Task = require("../models/Task");

router.get("/", (req, res) => {
  //res.status(200).json(["task 1", "iueubuuvwibwvib", "to do", 1]);
  Task.find({})
    .then((task) => res.status(200).json(task))
    .catch((error) => res.status(400).json(error));
});

module.exports = router;
