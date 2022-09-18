import Playlist from "../models/playlist.model.js";
import getVideosByID from "./getVideosByID.js";

const populatePlaylists = async (userID) => {
  const queriedPlaylists = await Playlist.find({
    user_id: userID,
  });
  const populatedPlaylist = [];
  for (const playlist of queriedPlaylists) {
    if (playlist.videos.length !== 0) {
      playlist.videos = await getVideosByID(playlist.videos);
    }
    populatedPlaylist.push(playlist);
  }
  return populatedPlaylist;
};

export default populatePlaylists;
