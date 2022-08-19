import asyncHandler from "express-async-handler";
import Completion from "../../models/completion.js";

export const updateCompletion = asyncHandler(async (req, res) => {
  const completion = await Completion.findById(req.params.id);
  if (!completion) {
    res.status(400);
    throw new Error("Completion not found");
  }

  const updatedCompletion = await Completion.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedCompletion);
});
