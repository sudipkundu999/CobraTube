import User from "../models/user.model.js";
import Video from "../models/video.model.js";
import getVideosByID from "../utils/getVideosByID.js";

export const getWatchlaterHandler = async (req, res) => {
  try {
    const watchlaterArray = await getVideosByID(req.user.watchlater);
    res.status(200).json({ watchlater: watchlaterArray });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

export const addItemToWatchlater = async (req, res) => {
  try {
    const { videoID } = req.params;
    const videoExistsInDB = (await Video.find({ _id: videoID }).count()) > 0;
    if (videoExistsInDB) {
      const videoExistInWatchlater = req.user.watchlater.includes(videoID);
      if (videoExistInWatchlater) {
        res.status(422).json({ message: "Video already exists" });
      } else {
        const { watchlater } = await User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $push: {
              watchlater: videoID,
            },
          },
          {
            returnDocument: "after",
          }
        );
        const watchlaterArray = await getVideosByID(watchlater);
        res.status(200).json({ watchlater: watchlaterArray });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

export const removeItemFromWatchlater = async (req, res) => {
  try {
    const { videoID } = req.params;
    const videoExistsInDB = (await Video.find({ _id: videoID }).count()) > 0;
    if (videoExistsInDB) {
      const videoExistInWatchlater = req.user.watchlater.includes(videoID);
      if (videoExistInWatchlater) {
        const { watchlater } = await User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $pull: {
              watchlater: videoID,
            },
          },
          {
            returnDocument: "after",
          }
        );
        const watchlaterArray = await getVideosByID(watchlater);
        res.status(200).json({ watchlater: watchlaterArray });
      } else {
        res
          .status(422)
          .json({ message: "User has not added this video to watchlater" });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};
