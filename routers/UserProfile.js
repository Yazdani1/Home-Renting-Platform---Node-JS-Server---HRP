const router = require("express").Router();
const { getUserPosts } = require("../controllers/UserProfile");


/**
 * Get user profile info and user posts
 */

router.get("/user-public-profile/:slug",getUserPosts);


module.exports = router;
