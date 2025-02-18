import {
  handleCreateUser,
  handleLogin,
} from "../controllers/admin.controllers.js";
import express from "express";

const router = express.Router();

router.post("/create", handleCreateUser);
router.post("/login", handleLogin);

export default router;
