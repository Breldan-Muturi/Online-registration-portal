import asyncHandler from "express-async-handler";
import Application from "../../models/application.js";

export const createApplication = asyncHandler(async (req, res) => {
  const {
    createdBy,
    sponsorType,
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
    !delivery ||
    !startDate ||
    !endDate ||
    !participants ||
    !contactPerson ||
    !contactEmail
  ) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  const application = await Application.create({
    createdBy,
    sponsorType,
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
