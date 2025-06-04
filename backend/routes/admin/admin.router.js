import express from "express";
import { handleUpdateProfilePhoto } from "../../controllers/admin/admin.controllers.js";
import { verifyObjectId } from "../../middlewares/common/verifyId.js";

const router = express.Router();

router.put(
  "/update-profile-photo/:id",
  verifyObjectId,
  handleUpdateProfilePhoto
);

export default router;
