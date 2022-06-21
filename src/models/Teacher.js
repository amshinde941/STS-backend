import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const TeacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter valid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 6) {
          throw new Error("Enter a strong password");
        }
      },
    },
    classTeacherOf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    Classes: [
      {
        classId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Class",
        }, 
        subject: {
          type: String,
        },
      },
    ],
    tokens: [
      {
        token: {
          required: true,
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

TeacherSchema.methods.toJSON = function () {
  const teacher = this;
  const teacherObject = teacher.toObject();

  delete teacherObject.password;
  delete teacherObject.tokens;

  return teacherObject;
};

TeacherSchema.statics.findUsingCredentials = async (email, password) => {
  const lowercaseEmail = email.toLowerCase();
  const teacher = await Teacher.findOne({ email: lowercaseEmail });
  if (!teacher) {
    throw new Error("teacher not found");
  }

  const isFound = await bcrypt.compare(password, teacher.password);
  if (!isFound) {
    throw new Error("You have entered wrong password");
  }
  return teacher;
};

TeacherSchema.methods.generateAuthToken = async function () {
  const teacher = this; //user being generate
  const token = jwt.sign(
    { _id: teacher._id.toString() },
    process.env.TOKEN_SECRET
  );
  teacher.tokens = teacher.tokens.concat({ token });
  await teacher.save();
  return token;
};

TeacherSchema.pre("save", async function (next) { 
  const teacher = this; //user which is being saved
  if (teacher.isModified("password")) {
    teacher.password = await bcrypt.hash(teacher.password, 8);
  }
  next();
});

export const Teacher = mongoose.model("Teacher", TeacherSchema);
