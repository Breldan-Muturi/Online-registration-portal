import asyncHandler from "express-async-handler";
import Organization from "../../models/organization.js";

export const createOrganization = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    address,
    county,
    createdBy,
    admins,
    organizationLogo,
  } = await req.body;
  if (
    !name ||
    !email ||
    !phoneNumber ||
    !address ||
    !county ||
    !createdBy ||
    !admins
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const organization = await Organization.create({
    name,
    email,
    phoneNumber,
    address,
    county,
    createdBy,
    admins,
    organizationLogo,
  });

  res.status(200).json(organization);
});
