import express from "express";
import { createCompletion } from "../controllers/completion/create.js";
import { deleteCompletion } from "../controllers/completion/delete.js";
import { getCompletions } from "../controllers/completion/getAll.js";
import { getCompletionById } from "../controllers/completion/getById.js";
import { updateCompletion } from "../controllers/completion/update.js";

const router = express.Router();

router.route("/").get(getCompletions).post(createCompletion);
router
  .route("/:id")
  .get(getCompletionById)
  .patch(updateCompletion)
  .delete(deleteCompletion);

export default router;
