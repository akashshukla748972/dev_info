import { create } from "../controllers/admin.controllers.js";
import express from "express";

const router = express.Router();

router.post("/create", create);

export default router;
