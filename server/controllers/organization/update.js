import asyncHandler from "express-async-handler";
import Organization from "../../models/organization.js";

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
