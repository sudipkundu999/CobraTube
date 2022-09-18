import Video from "../models/video.model.js";

export const getVideoCategoriesHandler = async (req, res) => {
  try {
    const categories = await Video.find({}).distinct("videoCategory");
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};
