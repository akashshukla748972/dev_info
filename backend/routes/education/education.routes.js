import express from "express";
import { authMiddleware } from "../../middlewares/auth/authCheck.middleware.js";
import { handleCreateEducation } from "../../controllers/education/education.controller.js";

const router = express.Router();

router.post("/create-education", authMiddleware, handleCreateEducation);

export default router;
