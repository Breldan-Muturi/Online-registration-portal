import express from "express";
import { registerUser } from "../controllers/auth/register.js";
import { loginUser } from "../controllers/auth/login.js";
import { googleAuth } from "../controllers/auth/googleAuth.js";
import { logoutUser } from "../controllers/auth/logout.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);
router.post("/logout", logoutUser);

export default router;
