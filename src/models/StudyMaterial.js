import mongoose from "mongoose";
import validator from "validator"; 
const StudyMaterialSchema = new mongoose.Schema(
  {
    subjectTitle: {
      type: String,
      required: true,
    },
    docArray: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        link: {
          type: String,
          validate(value) {
            if (!validator.isURL(value, { protocols: ['http', 'https'], require_protocol: true })) {
              throw new Error("Enter valid url");
            }
          },
        }
      }
    ]


  },
  {
    timestamps: true,
  }
);
export const StudyMaterial = mongoose.model("StudyMaterial", StudyMaterialSchema);