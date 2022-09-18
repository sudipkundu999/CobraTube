import express from "express";
import {
  getAllVideosHandler,
  getVideoHandler,
  addVideosHandler,
} from "../../controllers/video.controller.js";

const router = express.Router();

router.route("/").get(getAllVideosHandler).post(addVideosHandler);
router.route("/:videoID").get(getVideoHandler);

export default router;
