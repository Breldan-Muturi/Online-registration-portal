import asyncHandler from "express-async-handler";
import Completion from "../../models/completion.js";

export const updateCompletion = asyncHandler(async (req, res) => {
  const completion = await Completion.findById(req.params.id);
  if (!completion) {
    res.status(400);
    throw new Error("Completion not found");
  }

  if (req.files) {
    let path = "";
    req.files.array.forEach(function (files, index, arr) {
      path = path + files.path + ",";
    });
    path = path.substring(0, path.lastIndexOf(","));
  }

  const evidence = req.files.map((evidence) => ({
    path: evidence.path,
    name: evidence.filename,
    size: `${(evidence.size / 1000).toFixed(2).toString()} KBs`,
  }));

  const updatedCompletion = await Completion.findByIdAndUpdate(
    req.params.id,
    { ...req.body, evidence },
    { new: true }
  );
  res.status(200).json(updatedCompletion);
});
