import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    institution: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      default: null,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    grade: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    logo: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
  },
  { timestamps: true }
);

const educationModel = model("education", educationSchema);
export default educationModel;
