import asyncHandler from "express-async-handler";
import Application from "../../models/applicationModel.js";

export const getApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find(req.application);
  res.status(200).json(applications);
});

export const createApplication = asyncHandler(async (req, res) => {
  const {
    createdBy,
    courseId,
    topics,
    delivery,
    venue,
    startDate,
    endDate,
    fee,
    participants,
    applicationFee,
    status,
    contactPerson,
    contactEmail,
    contactPhoneNumber,
  } = await req.body;

  if (
    !createdBy ||
    !courseId ||
    !topics ||
    !delivery ||
    !startDate ||
    !endDate ||
    !fee ||
    !participants ||
    !applicationFee ||
    !status ||
    !contactPerson ||
    !contactEmail ||
    !contactPhoneNumber
  ) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  const application = await Application.create({
    createdBy,
    courseId,
    topics,
    delivery,
    venue,
    startDate,
    endDate,
    fee,
    participants,
    applicationFee,
    status,
    contactPerson,
    contactEmail,
    contactPhoneNumber,
  });

  res.status(200).json(application);
});

export const updateApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (!application) {
    res.status(400);
    throw new Error("Application not found");
  }

  const updatedApplication = await Application.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedApplication);
});

export const deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (!application) {
    res.status(400);
    throw new Error("Application not found");
  }
  await application.remove();
  res.status(200).json({ id: req.params.id });
});
