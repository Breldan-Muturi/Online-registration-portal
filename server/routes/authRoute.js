import express from "express";
import { registerUser } from "../controllers/authControllers/register.js";
import { loginUser } from "../controllers/authControllers/login.js";
import { googleAuth } from "../controllers/authControllers/googleAuth.js";
import { logoutUser } from "../controllers/authControllers/logout.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);
router.post("/logout", logoutUser);

export default router;
