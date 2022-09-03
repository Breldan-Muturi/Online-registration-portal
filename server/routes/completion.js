import express from "express";
import { storage } from "../middleware/fileUpload/completion.js";
import { createCompletion } from "../controllers/create/completion.js";
import { deleteCompletion } from "../controllers/delete/completion.js";
import { getCompletions } from "../controllers/getAll/completion.js";
import { getCompletionById } from "../controllers/getById/completion.js";
import { updateCompletion } from "../controllers/update/completion.js";
import { deleteSelectedCompletions } from "../controllers/deleteMany/completion.js";

const router = express.Router();

router
  .route("/")
  .get(getCompletions)
  .post(storage.array("evidence"), createCompletion);

router.route("/selected").delete(deleteSelectedCompletions);

router
  .route("/:id")
  .get(getCompletionById)
  .patch(storage.array("evidence"), updateCompletion)
  .delete(deleteCompletion);

export default router;
