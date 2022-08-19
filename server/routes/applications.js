import express from "express";
import { createApplication } from "../controllers/application/create.js";
import { deleteApplication } from "../controllers/application/delete.js";
import { getApplications } from "../controllers/application/getAll.js";
import { getApplicationById } from "../controllers/application/getById.js";
import { updateApplication } from "../controllers/application/update.js";

const router = express.Router();

router.route("/").get(getApplications).post(createApplication);
router
  .route("/:id")
  .get(getApplicationById)
  .patch(updateApplication)
  .delete(deleteApplication);

export default router;
