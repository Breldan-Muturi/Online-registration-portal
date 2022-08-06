import express from "express";
import { getUser } from "../controllers/userControllers/getUser.js";

const router = express.Router();

router.get("/getuser", getUser);

export default router;
