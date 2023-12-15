import mongoose from "mongoose";

const userTaskSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    taskTitle: {
      type: String,
      required: true,
    },
    taskDescription: {
      type: String,
      required: true,
    },
    taskStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.userTaskSchema ||
  mongoose.model("userTask", userTaskSchema);
