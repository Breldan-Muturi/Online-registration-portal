import asyncHandler from "express-async-handler";
import Topic from "../../models/topic.js";

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
