import express from "express";
import {
  getTopics,
  createTopic,
  updateTopic,
  deleteTopic,
} from "../controllers/topicControllers/topicController.js";

const router = express.Router();

router.route("/").get(getTopics).post(createTopic);
router.route("/:id").put(updateTopic).delete(deleteTopic);

export default router;
