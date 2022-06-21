import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  { 
    from: {
      from: {
        type: String,
        required: true,
      },
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
      school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
      },
    },
    to: {
      to: {
        type: String,
        required: true,
      },
      us: {
        type: Boolean,
      }, 
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
      school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
      },
    }, 
    issue: {
      type: String,
      trim: true,
      required: true,
    },
    reply: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true,
  }
);

export const Feedback = mongoose.model("Feedback", FeedbackSchema);
