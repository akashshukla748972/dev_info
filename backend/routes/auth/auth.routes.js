import express from "express";
import {
  handleCreateUser,
  handleLoginUser,
} from "../../controllers/auth/auth.controller.js";

const router = express.Router();

router.post("/register", handleCreateUser);
router.post("/login", handleLoginUser);

export default router;
