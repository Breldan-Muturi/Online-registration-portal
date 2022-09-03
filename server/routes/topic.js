import express from "express";
import { createTopic } from "../controllers/create/topic.js";
import { deleteTopic } from "../controllers/delete/topic.js";
import { getTopics } from "../controllers/getAll/topic.js";
import { getTopicById } from "../controllers/getById/topic.js";
import { updateTopic } from "../controllers/update/topic.js";
import { getTopicByCourseId } from "../controllers/getByCourseId/topic.js";

const router = express.Router();

router.route("/").get(getTopics).post(createTopic);
router.route("/:id").get(getTopicById).patch(updateTopic).delete(deleteTopic);
router.route("/course/:id").get(getTopicByCourseId);

export default router;
