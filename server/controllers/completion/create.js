import asyncHandler from "express-async-handler";
import Completion from "../../models/completion.js";

export const createCompletion = asyncHandler(async (req, res) => {
  const { date, courseId, participant, createdBy, status } = await req.body;

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

  if (
    !date ||
    !courseId ||
    !participant ||
    !createdBy ||
    !status ||
    !evidence
  ) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  const completion = await Completion.create({
    date,
    courseId,
    participant,
    createdBy,
    status,
    evidence,
  });

  res.status(200).json(completion);
});
