const HomeRentPost = require("../model/HomeRentPost");
const User = require("../model/Users");

/**
 * Get - user public profile and user posts
 * @param {*} req
 * @param {*} res
 */

exports.getUserPosts = async (req, res) => {
  try {
    const userQuery = { slug: req.params.slug };
    const userProfile = await User.findOne(userQuery).select("-password");

    if (!userProfile) {
      return res.status(404).json({ error: "User could not found" });
    }

    const userAllPosts = await HomeRentPost.find({
      postedBy: userProfile._id,
      visibility: "Public",
    })
      .populate("postedBy", "_id slug name")
      .populate("categoryBy", "_id categoryName slug")
      .sort({ date: -1 });

    res.status(200).json({ userProfile, userAllPosts });
  } catch (error) {
    res.status(400).json({ error: "Something Went Wrong, Could not Log In" });
  }
};
