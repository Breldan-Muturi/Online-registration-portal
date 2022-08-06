import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

export const logoutUser = asyncHandler(async (req, res) => {
  //On client also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;
  //Is refreshToken in DB
  const user = User.find((findUser) => findUser.refreshToken === refreshToken);
  if (!user) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return res.sendStatus(403); // No content
  }

  //Delete refresh token in the DB
  user.refreshToken = user.refreshToken.filter(
    (filteredRefreshToken) => filteredRefreshToken !== refreshToken
  );
  await user.save();

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  }); //secure: true - only serves https
  res.sendStatus(204); //No content
});
