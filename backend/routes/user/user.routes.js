import express from "express";
import { handleCreateSubscriber } from "../../controllers/user/user.controller.js";

const router = express.Router();

router.post("/subscribe", handleCreateSubscriber);

export default router;
