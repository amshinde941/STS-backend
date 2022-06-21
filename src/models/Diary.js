import mongoose from "mongoose"; 

const DiarySchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    diaryArray: [
      {
        message: {
          type: String,
        },
        author: {
          student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
          teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher',
          } 
        }
      }
    ] 
  },
  {
    timestamps: true,
  }
);
export const Diary = mongoose.model("Diary", DiarySchema);