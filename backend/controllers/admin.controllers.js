import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import adminModel from "../models/admin.model.js";

export const create = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "Admin Photo is Required" });
    }

    const { photo } = req.files;
    const allowedFormats = ["image/jpg", "image/png", "image/jpeg"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res
        .status(400)
        .json({ error: "User Photo Allowed Type Only jpg, png" });
    }

    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        error: "All Fields Are Required: Name, Email, Phone, Password",
      });
    }

    const admin = await adminModel.find();
    if (admin.length !== 0) {
      return res.status(409).json({ error: "Admin Already Exists" });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return res.status(500).json({ error: "Cloudinary Upload Failed" });
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

    res.status(201).json({
      data: {
        name: newAdmin.name,
        email: newAdmin.email,
        phone: newAdmin.phone,
        photo: newAdmin.photo,
        is_admin: newAdmin.is_admin,
        is_active: newAdmin.is_active,
        created_at: newAdmin.created_at,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
