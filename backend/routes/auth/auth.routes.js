import express from "express";
import {
  handleCheckAuth,
  handleCreateUser,
  handleLoginUser,
  handleLogoutUser,
} from "../../controllers/auth/auth.controller.js";
import { authMiddleware } from "../../middlewares/auth/authCheck.middleware.js";

const router = express.Router();

router.post("/register", handleCreateUser);
router.post("/login", handleLoginUser);
router.get("/check-auth", authMiddleware, handleCheckAuth);
router.get("/logout", authMiddleware, handleLogoutUser);

export default router;
