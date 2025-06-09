import express from "express";
import { authMiddleware } from "../../middlewares/auth/authCheck.middleware.js";
import {
  handleCreateTestimonial,
  handleDeleteTestimonialFeedback,
  handleGetAllTestimonialFeedback,
  handleUpdateTestimonialFeedback,
} from "../../controllers/testimonial/testimonial.controller.js";
const router = express.Router();

router.post("/create-feedback", handleCreateTestimonial);
router.get("/get-all-feedback", handleGetAllTestimonialFeedback);
router.delete(
  "/delete-feedback/:id",
  authMiddleware,
  handleDeleteTestimonialFeedback
);
router.put(
  "/update-feedback/:id",
  authMiddleware,
  handleUpdateTestimonialFeedback
);

export default router;
