import express from "express";
import { authMiddleware } from "../../middlewares/auth/authCheck.middleware.js";
import {
  handleCreateEducation,
  handleDeleteEducation,
  handleGetAllAdminEducation,
  handleUpdateEducation,
} from "../../controllers/education/education.controller.js";
import { verifyObjectId } from "../../middlewares/common/verifyId.js";

const router = express.Router();

router.post("/create-education", authMiddleware, handleCreateEducation);
router.get("/get-all-education", authMiddleware, handleGetAllAdminEducation);
router.delete(
  "/delete-education/:id",
  verifyObjectId,
  authMiddleware,
  handleDeleteEducation
);
router.put(
  "/update-education/:id",
  verifyObjectId,
  authMiddleware,
  handleUpdateEducation
);

export default router;
