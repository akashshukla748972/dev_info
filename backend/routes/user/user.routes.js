import express from "express";
import {
  handleCreateClient,
  handleCreateSubscriber,
  handleGenMailOtp,
  handleLoginClient,
  handleVerifyMailOtp,
} from "../../controllers/user/user.controller.js";
import { authMiddleware } from "../../middlewares/auth/authCheck.middleware.js";

const router = express.Router();

router.post("/subscribe", handleCreateSubscriber);
router.post("/register", handleCreateClient);
router.post("/login", handleLoginClient);
router.get("/verify-mail", authMiddleware, handleGenMailOtp);
router.get("/verify-otp", authMiddleware, handleVerifyMailOtp);

export default router;
