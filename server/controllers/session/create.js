import asyncHandler from "express-async-handler";
import Session from "../../models/session.js";

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
