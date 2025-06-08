import express from "express";
import {
  handleCreateSkill,
  handleDeleteSkill,
  handleGetAllSkill,
  handleUpdateSkill,
} from "../../controllers/skill/skill.controller.js";
import { authMiddleware } from "../../middlewares/auth/authCheck.middleware.js";
import { verifyObjectId } from "../../middlewares/common/verifyId.js";

const router = express.Router();

router.post("/create-skill", authMiddleware, handleCreateSkill);
router.get("/get-all-skill", authMiddleware, handleGetAllSkill);
router.delete(
  "/delete-skill/:id",
  verifyObjectId,
  authMiddleware,
  handleDeleteSkill
);
router.put(
  "/update-skill/:id",
  verifyObjectId,
  authMiddleware,
  handleUpdateSkill
);

export default router;
