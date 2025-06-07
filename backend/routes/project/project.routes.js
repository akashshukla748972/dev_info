import express from "express";
import { authMiddleware } from "../../middlewares/auth/authCheck.middleware.js";
import {
  handleCreateProject,
  handleGetALLProject,
  handleUploadMultipleProjectImage,
} from "../../controllers/project/project.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, handleCreateProject);
router.put("/upload-image", authMiddleware, handleUploadMultipleProjectImage);
router.get("/all-project", authMiddleware, handleGetALLProject);

export default router;
