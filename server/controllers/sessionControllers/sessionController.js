import asyncHandler from "express-async-handler";
import Session from "../../models/sessionModel.js";

export const getSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find(req.session);
  res.status(200).json(sessions);
});

export const createSession = asyncHandler(async (req, res) => {
  const {
    startDate,
    endDate,
    courseId,
    venue,
    onPremisesFee,
    onPremisesSlots,
    onlineFee,
    onlineSlots,
  } = await req.body;

  if (!startDate || !endDate || !courseId) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  const session = await Session.create({
    startDate,
    endDate,
    courseId,
    venue,
    onPremisesFee,
    onPremisesSlots,
    onlineFee,
    onlineSlots,
  });

  res.status(200).json(session);
});

export const updateSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session) {
    res.status(400);
    throw new Error("Session not found");
  }

  const updatedSession = await Session.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedSession);
});

export const deleteSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session) {
    res.status(400);
    throw new Error("Session not found");
  }
  await session.remove();
  res.status(200).json({ id: req.params.id });
});
