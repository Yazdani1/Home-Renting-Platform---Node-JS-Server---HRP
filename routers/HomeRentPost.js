const router = require("express").Router();
const {
  createHomeRentPost,
  getAllHomeRentPost,
  deleteHomeRentalPost,
  getHomeRentalDetailsPost,
  getLogedInuserPosts,
  searchHomeRentPosts
} = require("../controllers/HomeRentPost");
const { requireLogin, isAdmin } = require("../middleware/auth");

/**
 * To create a new home rent post
 */

router.post("/create-homerent-post", requireLogin, createHomeRentPost);

/**
 * To get all the home rent posts
 */

router.get("/getall-home-rent-post", getAllHomeRentPost);

/**
 * To get home rental details post and more posts based on category, city and the same user
 */

router.get("/home-rental-details-post/:slug", getHomeRentalDetailsPost);

/**
 * To get logedin user posts. when user login user should see only all of their published posts
 */

router.get("/get-single-user-posts",requireLogin,getLogedInuserPosts);


/**
 * ID- to delete home rental post
 */

router.delete(
  "/delete-home-rental-post/:id",
  requireLogin,
  deleteHomeRentalPost
);



/**
 * Search post
 */


router.get("/search-home-rent",searchHomeRentPosts);


module.exports = router;
