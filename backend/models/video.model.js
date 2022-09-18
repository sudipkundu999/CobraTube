import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  youtubeID: String,
  videoCategory: String,
  videoTitle: String,
  videoLength: String,
  videoViews: String,
  videoUploadedOn: { day: Number, month: Number, year: Number },
  videoDescription: String,
  creatorName: String,
  creatorThumbnail: String,
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
