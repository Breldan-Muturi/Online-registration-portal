import asyncHandler from "express-async-handler";
import Completion from "../../models/completion.js";

export const createCompletion = asyncHandler(async (req, res) => {
  const { date, courseId, participant, createdBy, status, evidence } =
    await req.body;

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
