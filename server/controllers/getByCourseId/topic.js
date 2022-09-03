import asyncHandler from "express-async-handler";
import Topic from "../../models/topic.js";

export const getTopicByCourseId = asyncHandler(async (req, res) => {
  const topics = await Topic.find({ courseId: req.params.id });
  if (!topics) {
    res.status(400);
    throw new Error("No topic for this course");
  }
  res.status(200).json(topics);
});
