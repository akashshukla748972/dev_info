import express from "express";
import {
  handleCreateClient,
  handleCreateSubscriber,
  handleLoginClient,
  handleVerifyOtp,
} from "../../controllers/user/user.controller.js";
import { authMiddleware } from "../../middlewares/auth/authCheck.middleware.js";

const router = express.Router();

router.post("/subscribe", handleCreateSubscriber);
router.post("/register", handleCreateClient);
router.post("/login", handleLoginClient);
router.post("/verify-otp", handleVerifyOtp);

export default router;
