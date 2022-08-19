import asyncHandler from "express-async-handler";
import User from "../../models/user.js";

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id, {
    _id: 1,
    firstName: 1,
    lastName: 1,
    email: 1,
    avatar: 1,
    roles: 1,
  });
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});
