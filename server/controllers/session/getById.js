import asyncHandler from "express-async-handler";
import Session from "../../models/session.js";

export const getSessionById = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session) {
    res.status(400);
    throw new Error("Session not found");
  }
  res.status(200).json(session);
});
