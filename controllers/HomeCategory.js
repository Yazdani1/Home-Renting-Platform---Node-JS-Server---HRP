const slugify = require("slugify");

const HomeCategory = require("../model/HomeCategory");
const HomeRentPost = require("../model/HomeRentPost");
require("dotenv").config();

exports.createHomeCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName) {
      return res.status(422).json({ error: "please add category_name" });
    }

    const slug = slugify(categoryName);
    const alreadyExist = await HomeCategory.findOne({ categoryName });
    if (alreadyExist) {
      return res
        .status(422)
        .json({ error: "Name already exist. try a new name" });
    }

    const homeCategoryDetails = HomeCategory({
      categoryName,
      slug,
      postedBy: req.user,
    });

    const saveHomeCategory = await HomeCategory.create(homeCategoryDetails);

    res.status(201).json(saveHomeCategory);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

/**
 * To get all the category list
 */

exports.getAllCategory = async (req, res) => {
  try {
    const allCategory = await HomeCategory.find()
      .sort({ date: -1 })
      .populate("postedBy", "_id name role");
    res.status(200).json(allCategory);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

/**
 * To get all the posts based on category
 * Need to pass category slug as a props to get all the posts based on a single category
 */

exports.getPostsByCategory = async (req, res) => {
  try {
    const categoryQuery = { slug: req.params.slug };

    const singleCategory = await HomeCategory.findOne(categoryQuery);

    if (!singleCategory) {
      return res.status(404).json({ error: "Category could not found" });
    }

    const allPostsByCategory = await HomeRentPost.find({
      categoryBy: singleCategory._id,
      visibility: "Public",
    })
      .populate("postedBy", "_id slug name")
      .populate("categoryBy", "_id categoryName slug")
      .sort({ date: -1 });

    res.status(200).json({ singleCategory, allPostsByCategory });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
