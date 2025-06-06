import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "admin",
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
    client_name: {
      type: String,
    },
    tech_stack: [String],
    features: [String],
    github_url: {
      type: String,
    },
    live_url: {
      type: String,
    },
    poster: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
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
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["Pending", "Fulfilled", "Rejected"],
      default: "Pending",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const projectModel = model("Project", projectSchema);
export default projectModel;
