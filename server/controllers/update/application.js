import asyncHandler from "express-async-handler";
import Application from "../../models/application.js";

export const updateApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (!application) {
    req.status(400);
    throw new Error("Application not found");
  }
  const updatedApplication = await Application.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedApplication);
});
