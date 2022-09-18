import express from "express";
import {
  getLikesHandler,
  addItemToLikedVideos,
  removeItemFromLikedVideos,
} from "../../controllers/likes.controller.js";

const router = express.Router();

router.route("/").get(getLikesHandler);
router
  .route("/:videoID")
  .post(addItemToLikedVideos)
  .delete(removeItemFromLikedVideos);

export default router;
