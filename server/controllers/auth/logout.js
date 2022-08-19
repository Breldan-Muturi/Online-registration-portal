import User from "../../models/user.js";

export const logoutUser = async (req, res) => {
  //On client also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  //Is refreshToken in DB
  const user = await User.findOne({ refreshToken }).exec();
  if (!user) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.sendStatus(204); // No content
  }

  //Delete refresh token in the DB
  user.refreshToken = user.refreshToken.filter((rt) => rt !== refreshToken);
  await user.save();

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  }); //secure: true - only serves https
  res.sendStatus(204); //No content
};
