import asyncHandler from "express-async-handler";
import Topic from "../../models/topic.js";

export const getTopics = asyncHandler(async (req, res) => {
  const topics = await Topic.find(req.topic);
  res.status(200).json(topics);
});
