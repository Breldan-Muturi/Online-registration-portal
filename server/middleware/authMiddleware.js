import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies["jwt"]) {
    token = req.cookies["jwt"];
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  } else {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      console.log("Decoded JWT");
      req.user = await User.findById(decoded.UserInfo.id).select("-password");
      next();
      console.log(req.user);
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
});
