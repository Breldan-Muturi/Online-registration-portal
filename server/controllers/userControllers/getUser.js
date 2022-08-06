import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

export const getUser = asyncHandler(async (req, res) => {
  const { _id, firstName, lastName, email, roles, avatar } =
    await User.findById(req.user._id);
  res.status(200).json({
    _id,
    firstName,
    lastName,
    email,
    roles,
    avatar,
  });
});
