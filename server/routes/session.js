import express from "express";
import { createSession } from "../controllers/create/session.js";
import { deleteSession } from "../controllers/delete/session.js";
import { getSessions } from "../controllers/getAll/session.js";
import { getSessionById } from "../controllers/getById/session.js";
import { updateSession } from "../controllers/update/session.js";
import { getSessionByCourseId } from "../controllers/getByCourseId/session.js";

const router = express.Router();

router.route("/").get(getSessions).post(createSession);
router
  .route("/:id")
  .get(getSessionById)
  .patch(updateSession)
  .delete(deleteSession);
router.route("/course/:id").get(getSessionByCourseId);

export default router;
