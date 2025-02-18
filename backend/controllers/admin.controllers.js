const adminModel = require("../models/admin.model");
const { v2 } = require("cloudinary");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const create = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        error: "Admin Photo is Required",
      });
    }

    const { photo } = req.files;
    const allowedFormats = ["image/jpg", "image/png", "image/jpeg"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({
        error: "User Photo Allowed Type Only jpg, png",
      });
    }

    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        error: `${name && "Name, "}${email && "Email, "}${phone && "Phone, "}${
          password && "Password, "
        }Is Required`,
      });
    }

    console.log("hello");
    const admin = await adminModel.find();
    if (!admin.length == 0) {
      return res.status(409).json({ error: "Admin Already Exist" });
    }
    const cloudinaryResponse = await v2.uploader.upload(photo.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newAdmin = new adminModel({
      name,
      email,
      phone,
      password: hashPassword,
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
      is_admin: true,
      is_active: true,
      created_at: Date.now(),
    });

    await newAdmin.save();

    if (newAdmin) {
      res.status(201).json({ data: newAdmin });
    }
    console.log(newAdmin);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { create };
