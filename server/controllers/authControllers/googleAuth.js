import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

export const googleAuth = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    const accessToken = jwt.sign(
      { id: userExists.id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "300s" }
    );
    const newRefreshToken = jwt.sign(
      { id: userExists.id },
      process.env.REFRESH_TOKEN,
      { expiresIn: "1d" }
    );

    let newRefreshTokenArray = !cookies?.jwt
      ? userExists.refreshToken
      : userExists.refreshToken.filter((rt) => rt !== cookies.jwt);

    if (cookies.jwt) {
      const refreshToken = cookies.jwt;
      const foundUser = await User.findOne({ refreshToken }).exec();
      if (!foundUser) {
        newRefreshTokenArray = [];
      }
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
    }

    userExists.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await userExists.save();
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: "true",
      maxAge: 24 * 60 * 60 * 1000,
    });

    //Send authorization roles and access token to user
    res.json({
      user: {
        id: userExists.id,
        firstName: userExists.firstName,
        lastName: userExists.lastName,
        email: userExists.email,
        avatar: userExists.avatar,
        roles: userExists.roles,
      },
      accessToken,
    });
  } else {
    const user = await User.create({
      ...req.body,
      fromGoogle: true,
    });
    if (user) {
      //Create JWTs
      const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN, {
        expiresIn: "300s",
      });
      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN,
        {
          expiresIn: "1d",
        }
      );
      user.refreshToken = refreshToken;
      await user.save();

      //Create secure cookie with refresh token
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      //Send authorization roles and access token to user
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
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});
