const router = require("express").Router();

const { createHomeCategory,getAllCategory,getPostsByCategory } = require("../controllers/HomeCategory");
const { requireLogin, isAdmin } = require("../middleware/auth");

/**
 * To create home category and only admin can create it
 */

router.post("/create-home-category", requireLogin, isAdmin, createHomeCategory);

/**
 * @Object - Get all the home category
 */

router.get("/get-all-category",getAllCategory);

/**
 * To get all the posts based on category
 * Need to pass category slug as a props to get all the posts based on a single category
 */

router.get("/get-posts-bycategory/:slug",getPostsByCategory);

module.exports = router;
