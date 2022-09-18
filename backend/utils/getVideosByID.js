import Video from "../models/video.model.js";

const getVideosByID = async (arrayOfID) => {
  const queriedVideos = await Video.find({ _id: { $in: arrayOfID } });
  return queriedVideos;
};

export default getVideosByID;
