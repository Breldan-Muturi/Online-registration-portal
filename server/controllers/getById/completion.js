import asyncHandler from "express-async-handler";
import Completion from "../../models/completion.js";

export const getCompletionById = asyncHandler(async (req, res) => {
  const completion = await Completion.findById(req.params.id);
  if (!completion) {
    res.status(400);
    throw new Error("Completion not found");
  }
  res.status(200).json(completion);
});
