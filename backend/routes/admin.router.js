import {
  handleCreateUser,
  handleEditProfile,
  handleLogin,
} from "../controllers/admin.controllers.js";
import express from "express";

const router = express.Router();

router.post("/create", handleCreateUser);
router.post("/login", handleLogin);
router.put("/update-profile/:id", handleEditProfile);

export default router;
