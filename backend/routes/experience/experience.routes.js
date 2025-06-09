import express from "express";
import { authMiddleware } from "../../middlewares/auth/authCheck.middleware.js";
import {
  handleCreateExperience,
  handleDeleteExperience,
  handleGetAllExperience,
  handleUpdateExperience,
} from "../../controllers/experience/experience.controller.js";
import { verifyObjectId } from "../../middlewares/common/verifyId.js";

const router = express.Router();

router.post("/create-experience", authMiddleware, handleCreateExperience);
router.get("/get-all-experience", authMiddleware, handleGetAllExperience);
router.delete(
  "/delete-experience/:id",
  verifyObjectId,
  authMiddleware,
  handleDeleteExperience
);
router.put(
  "/update-experience/:id",
  verifyObjectId,
  authMiddleware,
  handleUpdateExperience
);

export default router;
