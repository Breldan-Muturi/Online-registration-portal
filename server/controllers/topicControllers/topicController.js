import asyncHandler from "express-async-handler";
import Topic from "../../models/topicModel.js";

export const getTopics = asyncHandler(async (req, res) => {
  const topics = await Topic.find(req.topic);
  res.status(200).json(topics);
});

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

export const updateTopic = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic) {
    res.status(400);
    throw new Error("Topic not found");
  }

  const updatedTopic = await Topic.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTopic);
});

export const deleteTopic = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic) {
    res.status(400);
    throw new Error("Topic not found");
  }
  await topic.remove();
  res.status(200).json({ id: req.params.id });
});
