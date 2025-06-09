import express from "express";
import { authMiddleware } from "../../middlewares/auth/authCheck.middleware.js";
import { handleCreateTestimonial } from "../../controllers/testimonial/testimonial.controller.js";
const router = express.Router();

router.post("/create", authMiddleware, handleCreateTestimonial);

export default router;
