import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

export const googleAuth = asyncHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    const roles = Object.values(userExists.roles).filter(Boolean);
    //Create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: userExists._id,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "300s" }
    );
    const refreshToken = jwt.sign(
      { id: userExists._id },
      process.env.REFRESH_TOKEN,
      { expiresIn: "1d" }
    );
    userExists.refreshToken = refreshToken;
    const loginExistingUser = await userExists.save();

    //Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    //Send authorization roles and access token to user
    res.json({ roles, accessToken });
  } else {
    const user = await User.create({
      ...req.body,
      fromGoogle: true,
    });
    if (user) {
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
      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN,
        { expiresIn: "1d" }
      );
      user.refreshToken = refreshToken;
      const loginNewUser = await user.save();

      //Create secure cookie with refresh token
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      console.log({ user, roles, accessToken });
      //Send authorization roles and access token to user
      res.json({ roles, accessToken });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});
