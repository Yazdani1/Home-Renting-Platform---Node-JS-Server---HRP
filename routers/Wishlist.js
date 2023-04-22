const router = require("express").Router();

const { createWishListPost,getAllWishlist } = require("../controllers/Wishlist");
const { requireLogin } = require("../middleware/auth");

/**
 * To create wishlist post
 */

router.post("/create-wishlist-post", requireLogin, createWishListPost);


/**
 * To get all the wishlist posts for each logedin user
 */

router.get("/get-all-wishlist",requireLogin,getAllWishlist);

module.exports = router;
