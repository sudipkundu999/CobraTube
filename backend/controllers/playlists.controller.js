import mongoose from "mongoose";
import User from "../models/user.model.js";
import Video from "../models/video.model.js";
import Playlist from "../models/playlist.model.js";
import populatePlaylists from "../utils/populatePlaylists.js";

export const getPlaylistsHandler = async (req, res) => {
  try {
    const populatedPlaylists = await populatePlaylists(req.user._id);
    res.status(200).json({ playlists: populatedPlaylists });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

export const addPlaylist = async (req, res) => {
  try {
    const { title, description } = req.body.playlist;
    const newPlaylist = new Playlist({
      description: description,
      title: title,
      videos: [],
      user_id: req.user._id,
    });
    const createdPlaylist = await newPlaylist.save();
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: {
          playlists: createdPlaylist._id,
        },
      }
    );
    const populatedPlaylists = await populatePlaylists(req.user._id);
    res.status(200).json({ playlists: populatedPlaylists });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const { playlistID } = req.params;
    const playlistExists = req.user.playlists.find((p) => p == playlistID);
    if (playlistExists) {
      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: {
            playlists: mongoose.Types.ObjectId(playlistID),
          },
        }
      );
      await Playlist.findOneAndDelete({ _id: playlistID });
      const populatedPlaylists = await populatePlaylists(req.user._id);
      res.status(200).json({ playlists: populatedPlaylists });
    } else {
      res.status(422).json({ message: "Playlist does not exist" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

export const addVideoToPlaylist = async (req, res) => {
  try {
    const { videoID, playlistID } = req.params;
    const videoExistsInDB = (await Video.find({ _id: videoID }).count()) > 0;
    if (videoExistsInDB) {
      const playlistExists = req.user.playlists.find((p) => p == playlistID);
      if (playlistExists) {
        const { videos } = await Playlist.findOne({
          _id: playlistID,
        });
        const videoExistInPlaylist = videos.includes(videoID);
        if (videoExistInPlaylist) {
          res.status(422).json({ message: "Video already exists" });
        } else {
          await Playlist.findOneAndUpdate(
            { _id: playlistID },
            {
              $push: {
                videos: videoID,
              },
            },
            {
              returnDocument: "after",
            }
          );
          const populatedPlaylists = await populatePlaylists(req.user._id);
          res.status(200).json({ playlists: populatedPlaylists });
        }
      } else {
        res.status(401).json({ message: "Playlist does not exist" });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

export const deleteVideoFromPlaylist = async (req, res) => {
  try {
    const { videoID, playlistID } = req.params;
    const videoExistsInDB = (await Video.find({ _id: videoID }).count()) > 0;
    if (videoExistsInDB) {
      const playlistExists = req.user.playlists.find((p) => p == playlistID);
      if (playlistExists) {
        const { videos } = await Playlist.findOne({
          _id: playlistID,
        });
        const videoExistInPlaylist = videos.includes(videoID);
        if (videoExistInPlaylist) {
          await Playlist.findOneAndUpdate(
            { _id: playlistID },
            {
              $pull: {
                videos: videoID,
              },
            },
            {
              returnDocument: "after",
            }
          );
          const populatedPlaylists = await populatePlaylists(req.user._id);
          res.status(200).json({ playlists: populatedPlaylists });
        } else {
          res.status(422).json({
            message: "User has not added this video to this playlist",
          });
        }
      } else {
        res.status(401).json({ message: "Playlist does not exist" });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};
