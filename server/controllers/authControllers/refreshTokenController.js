import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";

export const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  const user = await User.findOne({ refreshToken }).exec();

  //Detected Refresh token reuse
  if (!user) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN,
      async (err, decoded) => {
        if (err) return res.sendStatus(403); //Forbidden
        const hackedUser = await User.findOne({ id: decoded.id }).exec();
        hackedUser.refreshToken = [];
        await hackedUser.save();
      }
    );
    return res.sendStatus(403); //Forbidden
  }

  const newRefreshTokenArray = user.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, decoded) => {
    if (err && user.id !== decoded.id) {
      user.refreshToken = [...newRefreshTokenArray];
      await user.save();
    }
    if (err || user.id !== decoded.id) return res.sendStatus(403);

    //Roles were still active
    const accessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN, {
      expiresIn: "300s",
    });
    const newRefreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "1d",
      }
    );
    user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await user.save();

    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: "true",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        roles: user.roles,
      },
      accessToken,
    });
  });
};
