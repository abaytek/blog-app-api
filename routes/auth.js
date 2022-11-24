const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", (req, res) => {
  try {
    User.findOne({ email: req.body.email }).then((user) => {
      bcrypt.compare(req.body.password, user.password).then((passCheck) => {
        if (!passCheck) {
          res.status(201).json("Email or password dont match");
        }
        const { password, ...others } = user._doc;
        res.status(200).json(others);
      });
    });
  } catch (err) {
    res.status(400).json("Username or email not found");
  }
});

module.exports = router;
