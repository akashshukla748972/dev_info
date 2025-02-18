import { handleCreateUser } from "../controllers/admin.controllers.js";
import express from "express";

const router = express.Router();

router.post("/create", handleCreateUser);

export default router;
