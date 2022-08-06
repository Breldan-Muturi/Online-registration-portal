import express from "express";
import {
  getOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from "../controllers/organizationControllers/organizationController.js";

const router = express.Router();

router.route("/").get(getOrganizations).post(createOrganization);
router.route("/:id").put(updateOrganization).delete(deleteOrganization);

export default router;
