import express from "express";
import {
  getHistoryHandler,
  addItemToHistory,
  removeItemFromHistory,
  deleteAllFromHistory,
} from "../../controllers/history.controller.js";

const router = express.Router();

router.route("/").get(getHistoryHandler).delete(deleteAllFromHistory);
router.route("/:videoID").post(addItemToHistory).delete(removeItemFromHistory);

export default router;
