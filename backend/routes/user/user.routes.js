import express from "express";
import {
  handleCreateClient,
  handleCreateSubscriber,
  handleLoginClient,
} from "../../controllers/user/user.controller.js";

const router = express.Router();

router.post("/subscribe", handleCreateSubscriber);
router.post("/register", handleCreateClient);
router.post("/login", handleLoginClient);

export default router;
