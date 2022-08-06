import express from "express";
import {
  getSessions,
  createSession,
  updateSession,
  deleteSession,
} from "../controllers/sessionControllers/sessionController.js";

const router = express.Router();

router.route("/").get(getSessions).post(createSession);
router.route("/:id").put(updateSession).delete(deleteSession);

export default router;
