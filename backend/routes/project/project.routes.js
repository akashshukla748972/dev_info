import express from "express";
import { authMiddleware } from "../../middlewares/auth/authCheck.middleware.js";
import { handleCreateProject } from "../../controllers/project/project.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, handleCreateProject);

export default router;
