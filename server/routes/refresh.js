import express from "express";
import { handleRefreshToken } from "../controllers/auth/refreshTokenController.js";

const router = express.Router();

router.get("/", handleRefreshToken);

export default router;
