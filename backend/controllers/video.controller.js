import mongoose from "mongoose";
import Video from "../models/video.model.js";

export const getAllVideosHandler = async (req, res) => {
  try {
    const videosFromDB = await Video.find({});
    res.status(200).json({ videos: videosFromDB });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

export const getVideoHandler = async (req, res) => {
  const { videoID } = req.params;
  try {
    if (mongoose.Types.ObjectId.isValid(videoID)) {
      const videoFromDB = await Video.findOne({ _id: videoID });
      if (videoFromDB) {
        res.status(200).json({ video: videoFromDB });
        return;
      }
    }
    res.status(404).json({ message: "Video not found" });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

export const addVideosHandler = async (req, res) => {
  const { video } = req.body;
  const { secret } = req.headers;
  if (!secret) {
    res.status(400).json({
      message: "Mandatory header missing",
    });
    return;
  }
  try {
    if (secret === process.env.SECRET) {
      const videoToUpload = new Video(video);
      await videoToUpload.save();
      res.status(200);
    }
    res.status(401).json({
      message: "Wrong Secret Key",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};
