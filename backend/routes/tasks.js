const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const User = require("../models/User");

router.get("/", (req, res) => {
  Task.find({})
    .then((task) => res.status(200).json(task))
    .catch((error) => res.status(400).json(error));
});

router.get("/getByEmail", async (req, res) => {
  const email = req.query.user.email;

  const dbUser = await User.findOne({ email });
  console.log(dbUser);

  Task.find({
    userId: dbUser._id,
  })
    .exec()
    .then((task) => {
      console.log(task);
      if (!task) {
        return res.status(400).json("User does not have tasks.");
      }
      res.status(200).json(task);
    })
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

router.post("/", async (req, res) => {
  const task = req.body.task;
  const user = req.body.user;
  const email = req.body.user.email;
  console.log(task);
  console.log(user);
  console.log(email);

  const dbUser = await User.findOne({ email });
  console.log(dbUser);

  const newTask = new Task({ ...task });
  newTask.title = task.title;
  newTask.description = task.description;
  newTask.userId = dbUser;

  console.log(newTask);
  newTask
    .save()
    .then(() => res.status(200).send(newTask))
    .catch((error) => res.status(400).send(error));
});

router.patch("/", (req, res) => {
  //console.log(req.body.task);
  try {
    Task.findOneAndUpdate(
      {
        _id: req.body.task,
      },
      {
        $set: req.body.task,
      },
      {
        new: true,
      }
    )
      .exec()
      .then((task) => {
        res.status(200).send(task);
      })
      .catch((err) => res.status(500).send(err));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
