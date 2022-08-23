import path from "path";
import express from "express";
import colors from "colors";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { credentials } from "./middleware/credentials.js";
import { corsOptions } from "./config/corsOptions.js";
import cors from "cors";
import auth from "./routes/auth.js";
import course from "./routes/course.js";
import user from "./routes/user.js";
import organization from "./routes/organization.js";
import session from "./routes/session.js";
import topic from "./routes/topic.js";
import completion from "./routes/completion.js";
import payment from "./routes/payment.js";
import application from "./routes/applications.js";
import refresh from "./routes/refresh.js";
import { verifyJWT } from "./middleware/verifyJWT.js";

const app = express();
dotenv.config();
connectDB();
const port = process.env.PORT;

app.use(express.json());

//Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

//middleware for cookies
app.use(cookieParser());

//routes
app.use("/api/auth", auth);
app.use("/api/courses", course);
app.use("/api/sessions", session);
app.use("/api/users", user);
app.use("/api/organizations", organization);
app.use("/api/topics", topic);
app.use("/api/completions", completion);
app.use("/api/payments", payment);
app.use("/api/applications", application);
app.use("/api/refresh", refresh);
app.use(verifyJWT);

app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(port, () => console.log(`Server started on port ${port}`));
});
