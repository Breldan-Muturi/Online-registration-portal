import mongoose from "mongoose";

const completionSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, "Please add a date"],
    },
    courseId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Course",
      required: [true, "Please add a parent course"],
    },
    participant: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "Please add a participant"],
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "Please add a creator"],
    },
    status: {
      type: String,
      default: "Pending",
    },
    evidence: [
      {
        path: String,
        name: String,
        size: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Completion", completionSchema);
