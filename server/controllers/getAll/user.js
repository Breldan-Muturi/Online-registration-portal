import asyncHandler from "express-async-handler";
import User from "../../models/user.js";

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find(req.user, {
    _id: 1,
    firstName: 1,
    lastName: 1,
    email: 1,
    avatar: 1,
    roles: 1,
  });
  res.status(200).json(users);
});
