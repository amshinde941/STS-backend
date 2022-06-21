import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    //only if created by teacher
    createdByTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Notice = mongoose.model("Notice", NoticeSchema);
