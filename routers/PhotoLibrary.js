const router = require("express").Router();

const { createPhotoLibrary,getPhotosFromPhotoLibrary } = require("../controllers/PhotoLibrary");
const { requireLogin } = require("../middleware/auth");

/**
 * To create photo library photos
 */

router.post("/create-photo-library", requireLogin, createPhotoLibrary);


/**
 * To get loged in user photo
 */

router.get("/photo-library",requireLogin, getPhotosFromPhotoLibrary);

module.exports = router;
