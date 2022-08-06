import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add a last name"],
    },
    email: {
      type: String,
      required: [true, "Please enter a valid email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    roles: {
      Applicant: {
        type: Number,
        default: 2001,
      },
      Admin: Number,
    },
    avatar: String,
    fromGoogle: {
      type: Boolean,
      default: false,
    },
    refreshToken: [String],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
