import { handleEditProfile } from "../controllers/admin.controllers.js";
import express from "express";

const router = express.Router();

router.put("/update-profile/:id", handleEditProfile);

export default router;
