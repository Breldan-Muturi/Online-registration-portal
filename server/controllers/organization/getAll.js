import asyncHandler from "express-async-handler";
import Organization from "../../models/organization.js";

export const getOrganizations = asyncHandler(async (req, res) => {
  const organization = await Organization.find(req.organization);
  res.status(200).json(organization);
});
