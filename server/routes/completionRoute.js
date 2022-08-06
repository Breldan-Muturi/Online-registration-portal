import express from "express";
import {
  getCompletions,
  createCompletion,
  updateCompletion,
  deleteCompletion,
} from "../controllers/completionControllers/completionController.js";

const router = express.Router();

router.route("/").get(getCompletions).post(createCompletion);
router.route("/:id").put(updateCompletion).delete(deleteCompletion);

export default router;
