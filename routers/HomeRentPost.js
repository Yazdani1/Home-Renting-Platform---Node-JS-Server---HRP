const router = require("express").Router();
const { createHomeRentPost,getAllHomeRentPost,deleteHomeRentalPost,getHomeRentalDetailsPost } = require("../controllers/HomeRentPost");
const { requireLogin, isAdmin } = require("../middleware/auth");


/**
 * To create a new home rent post
 */

router.post("/create-homerent-post",requireLogin,createHomeRentPost);


/**
 * To get home all the home rent posts
 */

router.get("/getall-home-rent-post",getAllHomeRentPost);


/**
 * ID- to delete home rental post
 */

router.delete("/delete-home-rental-post/:id",requireLogin,deleteHomeRentalPost);


/**
 * To get home rental details post and more posts based on category, city and the same user
 */

router.get("/home-rental-details-post/:slug",getHomeRentalDetailsPost);


module.exports = router;
