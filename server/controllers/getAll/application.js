import asyncHandler from "express-async-handler";
import Application from "../../models/application.js";

export const getApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find(req.application);
  res.status(200).json(applications);
});
