import express from "express";
import { authMiddleware } from "../../middlewares/auth/authCheck.middleware.js";
import { handleCreateExperience } from "../../controllers/experience/experience.controller.js";

const router = express.Router();

router.post("/create-experience", authMiddleware, handleCreateExperience);

export default router;
