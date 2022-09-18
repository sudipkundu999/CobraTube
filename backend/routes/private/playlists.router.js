import express from "express";
import {
  getPlaylistsHandler,
  addPlaylist,
  deletePlaylist,
  addVideoToPlaylist,
  deleteVideoFromPlaylist,
} from "../../controllers/playlists.controller.js";

const router = express.Router();

router.route("/").get(getPlaylistsHandler).post(addPlaylist);

router.route("/:playlistID").delete(deletePlaylist);

router
  .route("/:playlistID/:videoID")
  .post(addVideoToPlaylist)
  .delete(deleteVideoFromPlaylist);

export default router;
