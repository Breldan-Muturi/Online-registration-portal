import asyncHandler from "express-async-handler";
import Application from "../../models/application.js";

export const deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (!application) {
    res.status(400);
    throw new Error("Application not found");
  }
  await application.remove();
  res.status(200).json({ id: req.params.id });
});
