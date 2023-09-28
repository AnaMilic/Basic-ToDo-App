const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/", (req, res) => {
  //res.status(200).json(["ana", "ana@gmail.com", "123456789"]);
  User.find({})
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(400).json(error));
});

router.post("/", async (req, res) => {
  //const eventBody = req.body.user;
  const user = req.body.user;
  /*let user = await User.findOne({ email: eventBody.user.email });
  if (user != null) {
    return res.status(400).json("User with that email already has s profile.");
  }
  if (user == null) {
    const newUser = new User(eventBody.user);
    user = await newUser.save();
  }*/
  const { email } = user;
  User.findOne({ email }).then((dbUser) => {
    if (dbUser) {
      return res.status(400).json("That user already exists.");
    }
    const newUser = new User({ ...user });
    newUser
      .save()
      .then((us) => res.status(200).send(us))
      .catch((error) => res.status(400).send(error));
  });
});

module.exports = router;
