import asyncHandler from "express-async-handler";
import Session from "../../models/session.js";

export const getSessionByCourseId = asyncHandler(async (req, res) => {
  const sessions = await Session.find({ courseId: req.params.id });
  if (!sessions) {
    res.status(400);
    throw new Error("No session for this course");
  }
  res.status(200).json(sessions);
});
