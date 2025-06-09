import mongoose, { model } from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
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
    technologies: [
      {
        type: String, // ["React", "Node.js", "MongoDB"]
        trim: true,
      },
    ],
    logo: {
      public_id: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
  },
  { timestamps: true }
);

const experienceModel = model("experience", experienceSchema);

export default experienceModel;
