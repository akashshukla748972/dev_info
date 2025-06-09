import express from "express";
import { authMiddleware } from "../../middlewares/auth/authCheck.middleware.js";
import {
  handleCreateExperience,
  handleGetAllExperience,
} from "../../controllers/experience/experience.controller.js";

const router = express.Router();

router.post("/create-experience", authMiddleware, handleCreateExperience);
router.get("/get-all-experience", authMiddleware, handleGetAllExperience);

export default router;
