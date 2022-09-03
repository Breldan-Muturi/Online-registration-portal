import asyncHandler from "express-async-handler";
import Completion from "../../models/completion.js";

export const deleteSelectedCompletions = asyncHandler(async (req, res) => {
  const selectedCompletions = await req.body;
  console.log(selectedCompletions);
  await Completion.deleteMany({ _id: { $in: selectedCompletions } });
  res
    .status(200)
    .json({ success: `Deleted the completions of ids ${selectedCompletions}` });
});
