const slugify = require("slugify");

const HomeRentPost = require("../model/HomeRentPost");

exports.createHomeRentPost = async (req, res) => {
  try {
    const {
      title,
      des,
      rentAmount,
      photo,
      city,
      rooms,
      visibility,
      rented,
      categoryBy,
      latitude,
      longitude,
    } = req.body;

    if (!title) {
      return res.status(422).json({ error: "please add post title" });
    }

    if (!des) {
      return res.status(422).json({ error: "please add post des" });
    }

    if (!rentAmount) {
      return res.status(422).json({ error: "please add rent amount" });
    }

    if (!photo) {
      return res.status(422).json({ error: "please add photos" });
    }

    if (!city) {
      return res.status(422).json({ error: "please add city" });
    }
    if (!rooms) {
      return res.status(422).json({ error: "please add rooms number" });
    }

    if (!categoryBy) {
      return res.status(422).json({ error: "please add category" });
    }

    if (!latitude) {
      return res.status(422).json({ error: "please add latitude" });
    }

    if (!longitude) {
      return res.status(422).json({ error: "please add longitude" });
    }

    const slug = slugify(title);
    const alreadyExist = await HomeRentPost.findOne({ title });
    if (alreadyExist) {
      return res
        .status(422)
        .json({ error: "Title already exist. try a new title" });
    }

    const homeRentalPostDetails = HomeRentPost({
      title,
      des,
      rentAmount,
      photo,
      city,
      rooms,
      visibility,
      rented,
      categoryBy,
      latitude,
      longitude,
      slug,
      postedBy: req.user,
    });

    const saveHomeRental = await HomeRentPost.create(homeRentalPostDetails);

    res.status(201).json(saveHomeRental);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// To get all the home rent post

/**
 * To get all the public home rent posts
 * @param {*} req
 * @param {*} res
 */

exports.getAllHomeRentPost = async (req, res) => {
  try {
    const allHomeRent = await HomeRentPost.find({ visibility: "Public" })
      .populate("postedBy", "_id slug name role")
      .populate("categoryBy", "_id categoryName slug")
      .sort({ date: -1 });

    res.status(200).json(allHomeRent);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

/**
 * Delete home rental post
 */

exports.deleteHomeRentalPost = async (req, res) => {
  try {
    const deleteQuery = { _id: req.params.id };

    const singleHomerentPost = await HomeRentPost.findById(deleteQuery);

    if (!singleHomerentPost) {
      return res.status(422).json({ error: "Home rent item could not found" });
    }

    const logedInUserId = req.user._id;
    const singleUserid = singleHomerentPost.postedBy._id.toString();
    if (logedInUserId === singleUserid) {
      const deleteHomerentPost = await HomeRentPost.findByIdAndDelete(
        deleteQuery
      );
      res
        .status(200)
        .json({ deleteHomerentPost, message: "Deleted successfully" });
    } else {
      return res
        .status(422)
        .json({ error: "You can't delete other users expense list" });
    }
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

/**
 * To get home rental details post and more posts based on category, city and the same user
 * @param {*} req
 * @param {*} res
 */

exports.getHomeRentalDetailsPost = async (req, res) => {
  try {
    const singlePostQuery = { slug: req.params.slug };

    // To get single post details
    const singleHomeRentalPost = await HomeRentPost.findOne(singlePostQuery)
      .populate("postedBy", "_id slug name")
      .populate("categoryBy", "_id categoryName slug");

    // To get simmilar post based on the category

    const morePostsByCategory = await HomeRentPost.find({
      _id: { $ne: singleHomeRentalPost._id },
      categoryBy: singleHomeRentalPost.categoryBy._id.toString(),
      visibility: "Public",
      postedBy: { $ne: singleHomeRentalPost.postedBy._id.toString() },
    })
      .populate("postedBy", "_id slug name")
      .populate("categoryBy", "_id categoryName slug")
      .sort({ date: -1 });

    // To get simmilar post based on the city

    const morePostsByCity = await HomeRentPost.find({
      _id: { $ne: singleHomeRentalPost._id },
      city: singleHomeRentalPost.city,
      visibility: "Public",
      postedBy: { $ne: singleHomeRentalPost.postedBy._id.toString() },
    })
      .populate("postedBy", "_id slug name")
      .populate("categoryBy", "_id categoryName slug")
      .sort({ date: -1 });

    // To get simmilar post based on the user

    const morePostsBySameUser = await HomeRentPost.find({
      _id: { $ne: singleHomeRentalPost._id },
      postedBy: singleHomeRentalPost.postedBy._id.toString(),
      visibility: "Public",
    })
      .populate("postedBy", "_id slug name")
      .populate("categoryBy", "_id categoryName slug")
      .sort({ date: -1 })
      .limit(9);

    res.status(200).json({
      singleHomeRentalPost,
      morePostsByCategory,
      morePostsByCity,
      morePostsBySameUser,
    });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

/**
 * To get loged in user posts
 */

exports.getLogedInuserPosts = async (req, res) => {
  try {
    const logedInUserAllposts = await HomeRentPost.find({
      postedBy: req.user._id,
    })
      .populate("postedBy", "_id slug name")
      .populate("categoryBy", "_id categoryName slug")
      .sort({ date: -1 });

    res.status(200).json(logedInUserAllposts);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

/**
 * To search home rent posts
 */

exports.searchHomeRentPosts = async (req, res) => {
  const { min, max } = req.query;
  try {
    const searchResults = await HomeRentPost.find({
      rentAmount: { $gte: min | 1, $lte: max || 99999 },
      ...(req.query.room && { rooms: req.query.room.split(",") }),
      ...(req.query.city && { city: req.query.city.split(",") }),
      ...(req.query.category && { categoryBy: req.query.category.split(",") }),
    })
      .populate("postedBy", "_id slug name")
      .populate("categoryBy", "_id categoryName slug")
      .sort({ date: -1 });

    res.status(200).json(searchResults);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong" });
  }
};
