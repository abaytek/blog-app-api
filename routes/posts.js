const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// CREATE
router.post("/", async (req, res) => {
  const post = new Post(req.body);
  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//  UPDATE
router.put("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    try {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(401).json("You can only Update your account");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(400).json("There is no Post with this id");
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Post Deleted succesfuly");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can only delete youe post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get By Username or Categories name
router.get("/", async (req, res) => {
  // const username = req.query.user;
  // const catagoryName = req.query.cat;
  // try {
  //   let posts;
  //   if (username) {
  //     posts = await Post.find({ username: username });
  //   } else if (catagoryName) {
  //     posts = await Post.find({
  //       catagories: {
  //         $in: catagoryName,
  //       },
  //     });
  //   } else {
  //     posts = await Post.find();
  //   }
  //   res.status(200).json(posts);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  try {
    let posts = await Post.find({});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
