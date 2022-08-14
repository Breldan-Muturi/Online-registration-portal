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
import authRoute from "./routes/authRoute.js";
import courseRoute from "./routes/courseRoute.js";
import userRoute from "./routes/userRoute.js";
import organizationRoute from "./routes/organizationRoute.js";
import sessionRoute from "./routes/sessionRoute.js";
import topicRoute from "./routes/topicRoute.js";
import completionRoute from "./routes/completionRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import applicationRoute from "./routes/applicationRoute.js";
import refreshRoute from "./routes/refresh.js";
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

//middleware for cookies
app.use(cookieParser());

//routes
app.use("/api/auth", authRoute);
app.use("/api/courses", courseRoute);
app.use("/api/sessions", sessionRoute);
app.use("/api/refresh", refreshRoute);
app.use(verifyJWT);
app.use("/api/users", userRoute);
app.use("/api/organizations", organizationRoute);
app.use("/api/topics", topicRoute);
app.use("/api/completions", completionRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/applications", applicationRoute);

app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(port, () => console.log(`Server started on port ${port}`));
});
