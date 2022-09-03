import asyncHandler from "express-async-handler";
import Application from "../../models/application.js";

export const getApplicationById = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (!application) {
    res.status(400);
    throw new Error("Application not found");
  }
  res.status(200).json(application);
});
