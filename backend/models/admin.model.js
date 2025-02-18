import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    uniqie: true,
  },
  phone: {
    type: String,
    uniqie: true,
    default: null,
  },
  password: { type: String, require: true },
  photo: {
    public_id: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
  },
  is_admin: {
    type: Boolean,
    require: true,
    default: true,
  },
  is_active: {
    type: Boolean,
    require: true,
    default: true,
  },
});

const adminModel = mongoose.model("admin", adminSchema);
export default adminModel;
