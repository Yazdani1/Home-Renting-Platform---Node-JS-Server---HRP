const PhotoLibrary = require("../model/PhotoLibrary");

/**
 * Create Photo Library
 * @param {*} req
 * @param {*} res
 * @returns
 */

exports.createPhotoLibrary = async (req, res) => {
  try {
    const { imageurl } = req.body;

    if (!imageurl) {
      return res.status(422).json({ error: "please add imageurl" });
    }

    const imageUrlDetails = PhotoLibrary({
      imageurl,
      postedBy: req.user,
    });

    const saveImageUrl = await PhotoLibrary.create(imageUrlDetails);

    res.status(201).json(saveImageUrl);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

/**
 * Get logedin user photos from photo library
 */

exports.getPhotosFromPhotoLibrary = async (req, res) => {
  try {
    const photos = await PhotoLibrary.find({ postedBy: req.user })
      .populate("postedBy", "_id slug name")
      .sort({ date: -1 });

    res.status(200).json(photos);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong" });
  }
};
