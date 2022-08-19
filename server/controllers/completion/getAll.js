import asyncHandler from "express-async-handler";
import Completion from "../../models/completion.js";

export const getCompletions = asyncHandler(async (req, res) => {
  const completions = await Completion.find(req.completion);
  res.status(200).json(completions);
});
