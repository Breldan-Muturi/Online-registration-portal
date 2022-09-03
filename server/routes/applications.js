import express from "express";
import { createApplication } from "../controllers/create/application.js";
import { deleteApplication } from "../controllers/delete/application.js";
import { getApplications } from "../controllers/getAll/application.js";
import { getApplicationById } from "../controllers/getById/application.js";
import { updateApplication } from "../controllers/update/application.js";

const router = express.Router();

router.route("/").get(getApplications).post(createApplication);
router
  .route("/:id")
  .get(getApplicationById)
  .patch(updateApplication)
  .delete(deleteApplication);

export default router;
