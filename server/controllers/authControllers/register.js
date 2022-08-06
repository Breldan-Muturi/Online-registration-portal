import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = await req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(409); //Conflict
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (user) {
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
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
      expiresIn: "1d",
    });
    user.refreshToken = refreshToken;
    const loginUser = await user.save();

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
});
