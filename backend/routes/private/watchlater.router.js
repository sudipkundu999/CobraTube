import express from "express";
import {
  getWatchlaterHandler,
  addItemToWatchlater,
  removeItemFromWatchlater,
} from "../../controllers/watchlater.controller.js";

const router = express.Router();

router.route("/").get(getWatchlaterHandler);
router
  .route("/:videoID")
  .post(addItemToWatchlater)
  .delete(removeItemFromWatchlater);

export default router;
