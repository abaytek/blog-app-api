const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//  UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      ); // new:true sends the updated user to mongoDB
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("Update only allowed for your username");
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.id == req.params.id) {
    try {
      const user = User.findById(req.params.id);
      if (user) {
        try {
          const post = Post.deleteMany({ username: user.username });
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("Succesfully Deleted user");
        } catch (error) {
          res.status(500).json(error);
        }
      } else {
        res.status(400).json("User not found");
      }
    } catch (error) {
      res.status(401).json("There is no user by this Id");
    }
  } else {
    res.status(500).json("You can only Delete your account");
  }
});

// Get
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
