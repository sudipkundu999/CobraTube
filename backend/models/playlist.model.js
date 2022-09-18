import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  user_id: mongoose.Types.ObjectId,
  title: String,
  description: String,
  videos: Array,
});

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
