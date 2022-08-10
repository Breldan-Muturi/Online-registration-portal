import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

export const loginUser = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
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
    //Create JWTs
    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN, {
      expiresIn: "300s",
    });
    const newRefreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN,
      { expiresIn: "1d" }
    );

    let newRefreshTokenArray = !cookies?.jwt
      ? user.refreshToken
      : user.refreshToken.filter((rt) => rt !== cookies.jwt);

    if (cookies.jwt) {
      const refreshToken = cookies.jwt;
      const foundUser = await User.findOne({ refreshToken }).exec();
      if (!foundUser) {
        console.log("Attempted refresh token reuse at login");
        newRefreshTokenArray = [];
      }
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
    }

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
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});
