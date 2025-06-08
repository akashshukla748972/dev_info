import express from "express";
import { handleUpdateProfilePhoto } from "../../controllers/admin/admin.controllers.js";
import { verifyObjectId } from "../../middlewares/common/verifyId.js";
import { authMiddleware } from "../../middlewares/auth/authCheck.middleware.js";

const router = express.Router();

router.put("/update-profile-photo", authMiddleware, handleUpdateProfilePhoto);

export default router;
