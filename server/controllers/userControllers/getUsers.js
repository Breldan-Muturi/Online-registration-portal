import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find(req.user);
  res.status(200).json(users);
});
