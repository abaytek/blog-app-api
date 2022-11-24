const router = require("express").Router();
const Category = require("../models/Category");

//  CREATE
router.post("/", async (req, res) => {
  const newCatagory = new Category(req.body);
  try {
    const savedCategory = await newCatagory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
