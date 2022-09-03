import asyncHandler from "express-async-handler";
import Topic from "../../models/topic.js";

export const createTopic = asyncHandler(async (req, res) => {
  const { title, description, courseId } = await req.body;

  if (!title || !description || !courseId) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  const topic = await Topic.create({
    title,
    description,
    courseId,
  });

  res.status(200).json(topic);
});
