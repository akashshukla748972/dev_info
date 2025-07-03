import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      default: null,
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["User", "Client"],
      default: "User",
    },
    isValidEmail: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: "",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Inactive",
    },
    lastLogin: {
      type: Date,
      default: "",
    },
  },
  { timestamps: true }
);

const userModel = model("user", userSchema);
export default userModel;
