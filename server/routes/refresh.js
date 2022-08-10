import express from "express";
import { handleRefreshToken } from "../controllers/authControllers/refreshTokenController.js";

const router = express.Router();

router.get("/", handleRefreshToken);

export default router;
