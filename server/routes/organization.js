import express from "express";
import { createOrganization } from "../controllers/create/organization.js";
import { deleteOrganization } from "../controllers/delete/organization.js";
import { getOrganizations } from "../controllers/getAll/organization.js";
import { getOrganizationById } from "../controllers/getById/organization.js";
import { updateOrganization } from "../controllers/update/organization.js";

const router = express.Router();

router.route("/").get(getOrganizations).post(createOrganization);
router
  .route("/:id")
  .get(getOrganizationById)
  .patch(updateOrganization)
  .delete(deleteOrganization);

export default router;
