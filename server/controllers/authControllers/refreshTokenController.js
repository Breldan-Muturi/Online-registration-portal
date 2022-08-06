import User from "../../models/userModel.js";
import jwt from "jsonwebtoken";

export const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  const user = User.findOne({ refreshToken });

  // Detect refresh token reuse
  if (!user) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN,
      async (err, decoded) => {
        if (err) return res.sendStatus(403);
        const hackedUser = await User.findOne({ userId: decoded._id });
        hackedUser.refreshToken = [];
        const result = await hackedUser.save();
      }
    );
    return res.sendStatus(403);
  }

  const newRefreshTokenArray = user.refreshToken.filter(
    (filteredRefreshToken) => filteredRefreshToken !== refreshToken
  );

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, decoded) => {
    if (err) {
      user.refreshToken = [...newRefreshTokenArray];
      await (await user).save();
    }
    if (err || user._id !== decoded._id) return res.sendStatus(403);
    const roles = Object.values(user.roles);
    const accessToken = jwt.sign(
      { UserInfo: { userId: decoded._id, roles: roles } },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "300s",
      }
    );
    const newRefreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN,
      { expiresIn: "1d" }
    );
    //Saving refresh token with current user
    user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    //Create secure cookie with refresh token
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ roles, accessToken });
  });
};
