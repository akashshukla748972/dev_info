import {Schema, model} from "mongoose";

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
      default: null,
    },
    password: { type: String, required: true },
    avatar: {
      public_id: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
    },
    role: {
      type: String,
      enum: ["admin", "super_admin"],
      default: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const adminModel = model("admin", adminSchema);
export default adminModel;
