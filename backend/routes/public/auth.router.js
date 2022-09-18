import express from "express";
import {
  signupHandler,
  loginHandler,
  verifyHandler,
} from "../../controllers/auth.controller.js";

const router = express.Router();

router.route("/signup").post(signupHandler);
router.route("/login").post(loginHandler);
router.route("/verify").post(verifyHandler);

export default router;
