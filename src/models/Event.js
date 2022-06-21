import mongoose from "mongoose";
import validator from "validator"; 

const EventSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    eventDate:{
        type:Date,
        required: true,
    },
    title:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    link:{
        type:String,
        validate(value) {
            if (!validator.isURL(value, { protocols: ['http', 'https'], require_protocol: true })) {
              throw new Error("Enter valid url");
            }
          },
    } 
  },
  {
    timestamps: true,
  }
);
export const Event = mongoose.model("Event", EventSchema);