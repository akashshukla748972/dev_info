import express from "express";
import {
  handleCreateSkill,
  handleGetAllSkill,
} from "../../controllers/skill/skill.controller.js";
import { authMiddleware } from "../../middlewares/auth/authCheck.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, handleCreateSkill);
router.get("/get-all-skill", authMiddleware, handleGetAllSkill);

export default router;
