import { Schema, model } from "mongoose";

const skillSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Beginner",
    },
    category: {
      type: String,
      enum: ["Frontend", "Backend", "Database", "Additional Tool"],
      required: true,
    },
    subCategory: {
      type: String,
      enum: ["Framework", "Language", "Tools", null],
      default: null,
    },
    description: {
      type: String,
      default: null,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "admin",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Skill", skillSchema);
