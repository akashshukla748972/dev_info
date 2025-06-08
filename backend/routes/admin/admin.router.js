import express from "express";
import {
  handleUpdateProfileDetails,
  handleUpdateProfilePhoto,
} from "../../controllers/admin/admin.controllers.js";
import { verifyObjectId } from "../../middlewares/common/verifyId.js";
import { authMiddleware } from "../../middlewares/auth/authCheck.middleware.js";

const router = express.Router();

router.put("/update-profile-photo", authMiddleware, handleUpdateProfilePhoto);
router.put(
  "/update-profile-detail",
  authMiddleware,
  handleUpdateProfileDetails
);

export default router;
