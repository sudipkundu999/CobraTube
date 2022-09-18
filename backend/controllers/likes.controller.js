import User from "../models/user.model.js";
import Video from "../models/video.model.js";
import getVideosByID from "../utils/getVideosByID.js";

export const getLikesHandler = async (req, res) => {
  try {
    const likesArray = await getVideosByID(req.user.likes);
    res.status(200).json({ likes: likesArray });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

export const addItemToLikedVideos = async (req, res) => {
  try {
    const { videoID } = req.params;
    const videoExistsInDB = (await Video.find({ _id: videoID }).count()) > 0;
    if (videoExistsInDB) {
      const videoExistInLikes = req.user.likes.includes(videoID);
      if (videoExistInLikes) {
        res.status(422).json({ message: "Video already exists" });
      } else {
        const { likes } = await User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $push: {
              likes: videoID,
            },
          },
          {
            returnDocument: "after",
          }
        );
        const likesArray = await getVideosByID(likes);
        res.status(200).json({ likes: likesArray });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

export const removeItemFromLikedVideos = async (req, res) => {
  try {
    const { videoID } = req.params;
    const videoExistsInDB = (await Video.find({ _id: videoID }).count()) > 0;
    if (videoExistsInDB) {
      const videoExistInLikes = req.user.likes.includes(videoID);
      if (videoExistInLikes) {
        const { likes } = await User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $pull: {
              likes: videoID,
            },
          },
          {
            returnDocument: "after",
          }
        );
        const likesArray = await getVideosByID(likes);
        res.status(200).json({ likes: likesArray });
      } else {
        res.status(422).json({ message: "User has not liked this video" });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};
