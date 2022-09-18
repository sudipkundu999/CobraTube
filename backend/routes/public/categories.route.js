import express from "express";
import { getVideoCategoriesHandler } from "../../controllers/categories.controller.js";

const router = express.Router();

router.route("/").get(getVideoCategoriesHandler);

export default router;
