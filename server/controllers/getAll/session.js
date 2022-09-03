import asyncHandler from "express-async-handler";
import Session from "../../models/session.js";

export const getSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find(req.session);
  res.status(200).json(sessions);
});
