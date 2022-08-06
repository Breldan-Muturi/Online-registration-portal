import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

export const loginUser = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  const { email, password } = req.body;
  if ((!email, !password)) {
    res.sendStatus(400);
    throw new Error("Email and Password are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.sendStatus(401);
    throw new Error("This user does not exist");
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const roles = Object.values(user.roles).filter(Boolean);
    //Create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: user._id,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "300s" }
    );
    const newRefreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN,
      { expiresIn: "1d" }
    );

    let newRefreshTokenArray = !cookies?.jwt
      ? user.refreshToken
      : user.refreshToken.filter(
          (filteredRefreshToken) => filteredRefreshToken !== cookies.jwt
        );

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await User.findOne({ refreshToken });

      //Detected refresh token reuse!
      if (!foundToken) {
        newRefreshTokenArray = [];
      }

      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
    }

    //Saving refresh token with current user
    user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await user.save();

    //Create secure cookie with refresh token
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    //Send authorization roles and access token to user
    res.json({ roles, accessToken });
    console.log({ user, roles, accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});
