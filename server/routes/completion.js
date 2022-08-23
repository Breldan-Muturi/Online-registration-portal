import express from "express";
import { storage } from "../middleware/fileUpload/completion.js";
import { createCompletion } from "../controllers/completion/create.js";
import { deleteCompletion } from "../controllers/completion/delete.js";
import { getCompletions } from "../controllers/completion/getAll.js";
import { getCompletionById } from "../controllers/completion/getById.js";
import { updateCompletion } from "../controllers/completion/update.js";

const router = express.Router();

router
  .route("/")
  .get(getCompletions)
  .post(storage.array("evidence"), createCompletion);
router
  .route("/:id")
  .get(getCompletionById)
  .patch(storage.array("evidence"), updateCompletion)
  .delete(deleteCompletion);

export default router;
