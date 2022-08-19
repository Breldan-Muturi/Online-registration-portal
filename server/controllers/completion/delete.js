import asyncHandler from "express-async-handler";
import Completion from "../../models/completion.js";

export const deleteCompletion = asyncHandler(async (req, res) => {
  const completion = await Completion.findById(req.params.id);
  if (!completion) {
    res.status(400);
    throw new Error("Completion not found");
  }
  await completion.remove();
  res.status(200).json({ id: req.params.id });
});
