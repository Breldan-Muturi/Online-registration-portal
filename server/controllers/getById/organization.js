import asyncHandler from "express-async-handler";
import Organization from "../../models/organization.js";

export const getOrganizationById = asyncHandler(async (req, res) => {
  const organization = await Organization.findById(req.params.id);
  if (!organization) {
    res.status(400);
    throw new Error("Organization not found");
  }
  res.status(200).json(organization);
});
