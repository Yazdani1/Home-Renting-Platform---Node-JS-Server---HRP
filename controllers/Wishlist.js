const Wishlist = require("../model/Wishlist");

/**
 * To create wishlist post
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.createWishListPost = async (req, res) => {
  try {
    const { postOwner, postId } = req.body;

    if (!postOwner) {
      return res.status(422).json({ error: "Please add post owner ID" });
    }
    if (!postId) {
      return res.status(422).json({ error: "Please add postId" });
    }

    const alreadyExist = await Wishlist.findOne({
      postId,
      postedBy: req.user._id,
    });
    if (alreadyExist) {
      return res
        .status(422)
        .json({ error: "You have already saved this post" });
    }

    const wishlistDetails = Wishlist({
      postOwner,
      postId,
      postedBy: req.user,
    });

    const saveWishlist = await Wishlist.create(wishlistDetails);
    res.status(200).json(saveWishlist);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 * To get all the wishlist posts for a single loged in user
 * @param {*} req
 * @param {*} res
 */
exports.getAllWishlist = async (req, res) => {
  try {
    const allWishListPosts = await Wishlist.find({
      postedBy: req.user._id,
    })
      .populate(
        "postId",
        "title des rentAmount photo city rooms visibility rented slug date"
      )
      .populate("postedBy", "_id slug name")
      .populate("postOwner", "_id slug name");

    res.status(200).json(allWishListPosts);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 * Another way to populate multiple items
 */
// exports.getAllWishlist = async (req, res) => {
//     try {
//       const allWishListPosts = await Wishlist.find({
//         postedBy: req.user._id,
//       })
//         .populate({
//           path: "postId",
//           select: "title des rentAmount photo city rooms visibility rented slug date",
//           populate: {
//             path: "categoryBy",
//             select: "categoryName", // specify the fields you want to populate from HomeRentalCategory schema
//           },
//         })
//         .populate("postedBy", "_id slug name")
//         .populate("postOwner", "_id slug name");

//       res.status(200).json(allWishListPosts);
//     } catch (error) {
//       res.status(500).json({ error: "Something went wrong" });
//     }
//   };
