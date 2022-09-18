import User from "../models/user.model.js";
import Video from "../models/video.model.js";
import getVideosByID from "../utils/getVideosByID.js";

export const getHistoryHandler = async (req, res) => {
  try {
    const historyArray = await getVideosByID(req.user.history);
    res.status(200).json({ history: historyArray });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

export const addItemToHistory = async (req, res) => {
  try {
    const { videoID } = req.params;
    const videoExistsInDB = (await Video.find({ _id: videoID }).count()) > 0;
    if (videoExistsInDB) {
      const videoExistInHistory = req.user.history.includes(videoID);
      if (videoExistInHistory) {
        res.status(422).json({ message: "Video already exists" });
      } else {
        const { history } = await User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $push: {
              history: videoID,
            },
          },
          {
            returnDocument: "after",
          }
        );
        const historyArray = await getVideosByID(history);
        res.status(200).json({ history: historyArray });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

export const removeItemFromHistory = async (req, res) => {
  try {
    const { videoID } = req.params;
    const videoExistsInDB = (await Video.find({ _id: videoID }).count()) > 0;
    if (videoExistsInDB) {
      const videoExistInHistory = req.user.history.includes(videoID);
      if (videoExistInHistory) {
        const { history } = await User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $pull: {
              history: videoID,
            },
          },
          {
            returnDocument: "after",
          }
        );
        const historyArray = await getVideosByID(history);
        res.status(200).json({ history: historyArray });
      } else {
        res.status(422).json({ message: "User has not seen this video" });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

export const deleteAllFromHistory = async (req, res) => {
  try {
    const { history } = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        history: [],
      },
      {
        returnDocument: "after",
      }
    );
    res.status(200).json({ history: history });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};
