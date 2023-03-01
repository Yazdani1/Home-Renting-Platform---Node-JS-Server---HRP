const router = require("express").Router();
const {
  userRegistration,
  userLogin,
  getAllUser,
  getCurrentUserRole,
} = require("../controllers/Users");
const { requireLogin, isAdmin } = require("../middleware/auth");

/**
 * To do user registration
 */

router.post("/registration", userRegistration);

/**
 * To do user login
 */

router.post("/login", userLogin);

/**
 * @Object - It will return a list of all the users .
 */

router.get("/alluser", getAllUser);

/**
 * It will retunr only loged in user information and it willbe used to make protected route for the admin area
 */

router.get("/current-user-role", requireLogin, isAdmin, getCurrentUserRole);

module.exports = router;
