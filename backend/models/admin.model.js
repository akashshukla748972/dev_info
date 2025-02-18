const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    uniqie: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: { type: String, require: true },
  photo: {
    public_id: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
  is_admin: {
    type: Boolean,
    require: true,
  },
  is_active: {
    type: Boolean,
    require: true,
  },
  created_at: {
    type: Date,
    require: true,
  },
  updated_at: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("admin", adminSchema);
