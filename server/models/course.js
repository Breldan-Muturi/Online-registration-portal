import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    code: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    prerequisites: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Course",
      },
    ],
    courseImage: {
      path: String,
      name: String,
      size: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
