import express from "express";
import { getUsers } from "../controllers/userControllers/getUsers.js";

const router = express.Router();

router.get("/getUsers", getUsers);

export default router;
