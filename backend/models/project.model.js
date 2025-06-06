import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    user: {
        type: Schema.ObjectId,
        ref: "admin"
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    tech_stack: [String],
    features: [String],
    github_url: {
      type: String,
    },
    live_url: {
      type: String,
    },
    images: [String],
    video_demo_url: {
      type: String,
    },
    project_type: {
      type: String,
    },
    duration: {
      type: String,
    },
    difficulty_level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
  },
  { timestamps: true }
);

const projectModel = model("Project", projectSchema);
export default projectModel;
