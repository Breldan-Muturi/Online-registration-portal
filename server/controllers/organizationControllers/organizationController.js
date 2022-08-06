import asyncHandler from "express-async-handler";
import Organization from "../../models/organizationModel.js";

export const getOrganizations = asyncHandler(async (req, res) => {
  const organization = await Organization.find(req.organization);
  res.status(200).json(organization);
});

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

export const updateOrganization = asyncHandler(async (req, res) => {
  const organization = await Organization.findById(req.params.id);
  if (!organization) {
    res.status(400);
    throw new Error("Organization not found");
  }

  const updatedOrganization = await Organization.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedOrganization);
});

export const deleteOrganization = asyncHandler(async (req, res) => {
  const organization = await Organization.findById(req.params.id);
  if (!organization) {
    res.status(400);
    throw new Error("Organization not found");
  }
  await organization.remove();
  res.status(200).json({ id: req.params.id });
});
