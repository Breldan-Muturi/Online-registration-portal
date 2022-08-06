import asyncHandler from "express-async-handler";
import Completion from "../../models/completionModel.js";

export const getCompletions = asyncHandler(async (req, res) => {
  const completions = await Completion.find(req.completion);
  res.status(200).json(completions);
});

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

export const deleteCompletion = asyncHandler(async (req, res) => {
  const completion = await Completion.findById(req.params.id);
  if (!completion) {
    res.status(400);
    throw new Error("Completion not found");
  }
  await completion.remove();
  res.status(200).json({ id: req.params.id });
});
