import express from "express";
import { createSession } from "../controllers/session/create.js";
import { deleteSession } from "../controllers/session/delete.js";
import { getSessions } from "../controllers/session/getAll.js";
import { getSessionById } from "../controllers/session/getById.js";
import { updateSession } from "../controllers/session/update.js";
import { getSessionByCourseId } from "../controllers/session/getByCourseId.js";

const router = express.Router();

router.route("/").get(getSessions).post(createSession);
router
  .route("/:id")
  .get(getSessionById)
  .patch(updateSession)
  .delete(deleteSession);
router.route("/course/:id").get(getSessionByCourseId);

export default router;
