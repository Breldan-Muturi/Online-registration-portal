import asyncHandler from "express-async-handler";
import Topic from "../../models/topic.js";

export const deleteTopic = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic) {
    res.status(400);
    throw new Error("Topic not found");
  }
  await topic.remove();
  res.status(200).json({ id: req.params.id });
});
