import express from "express";
import { createTopic } from "../controllers/topic/create.js";
import { deleteTopic } from "../controllers/topic/delete.js";
import { getTopics } from "../controllers/topic/getAll.js";
import { getTopicById } from "../controllers/topic/getById.js";
import { updateTopic } from "../controllers/topic/update.js";

const router = express.Router();

router.route("/").get(getTopics).post(createTopic);
router.route("/:id").get(getTopicById).patch(updateTopic).delete(deleteTopic);

export default router;
