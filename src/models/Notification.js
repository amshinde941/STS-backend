import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const NotificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    message:{
        type: String,
        trim: true,
        required: true,
    },
   
 
  },
  {
    timestamps: true,
  }
);
export const Notification = mongoose.model("Notification", NotificationSchema);