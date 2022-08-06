import express from "express";
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationControllers/applicationController.js";

const router = express.Router();

router.route("/").get(getApplications).post(createApplication);
router.route("/:id").put(updateApplication).delete(deleteApplication);

export default router;
