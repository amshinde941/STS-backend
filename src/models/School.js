import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SchoolSchema = new mongoose.Schema(
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
    operatorName: {
      type: String,
      required: true,
      trim: true,
    },
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
    classes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
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

SchoolSchema.methods.toJSON = function () {
  const school = this;
  const schoolObject = school.toObject();

  delete schoolObject.password;
  delete schoolObject.tokens;

  return schoolObject;
};

SchoolSchema.statics.findUsingCredentials = async (email, password) => {
  const lowercaseEmail = email.toLowerCase();
  const school = await School.findOne({ email: lowercaseEmail })
    .populate("teachers")
    .populate("classes");

  if (!school) {
    throw new Error("school not found");
  }

  const isFound = await bcrypt.compare(password, school.password);
  if (!isFound) {
    throw new Error("You have entered wrong password");
  }

  return school;
};

SchoolSchema.methods.generateAuthToken = async function () {
  const school = this; //user being generate
  const token = jwt.sign(
    { _id: school._id.toString() },
    process.env.TOKEN_SECRET
  );
  school.tokens = school.tokens.concat({ token });
  await school.save();
  return token;
};

SchoolSchema.pre("save", async function (next) {
  const school = this; //user which is being saved
  if (school.isModified("password")) {
    school.password = await bcrypt.hash(school.password, 8);
  }
  next();
});

export const School = mongoose.model("School", SchoolSchema);
