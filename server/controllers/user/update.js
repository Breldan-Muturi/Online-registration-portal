import asyncHandler from "express-async-handler";
import User from "../../models/user.js";

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      avatar: req.file && `http://localhost:8000${req.file.path}`,
    },
    {
      new: true,
    }
  );
  res.status(200).json(updatedUser);
});
