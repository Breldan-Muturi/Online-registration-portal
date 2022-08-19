import express from "express";
import { createOrganization } from "../controllers/organization/create.js";
import { deleteOrganization } from "../controllers/organization/delete.js";
import { getOrganizations } from "../controllers/organization/getAll.js";
import { getOrganizationById } from "../controllers/organization/getById.js";
import { updateOrganization } from "../controllers/organization/update.js";

const router = express.Router();

router.route("/").get(getOrganizations).post(createOrganization);
router
  .route("/:id")
  .get(getOrganizationById)
  .patch(updateOrganization)
  .delete(deleteOrganization);

export default router;
