import { v2 as cloudinary } from "cloudinary";
import bcrypt, { hash } from "bcrypt";
import adminModel from "../models/admin.model.js";
import { genHash } from "../utils/genHash.js";

export const handleCreateUser = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      const errorField = [];
      if (!name) errorField.push("Name");
      if (!email) errorField.push("Email");
      if (!password) errorField.push("Password");

      return res.status(400).json({
        message: `${
          errorField.length > 0 && errorField.join(", ")
        } is required`,
        success: false,
        error: true,
      });
    }

    const admin = await adminModel.find();
    if (admin.length !== 0) {
      return res
        .status(409)
        .json({ message: "Admin Already Exists", success: false, error: true });
    }

    const hashPassword = await genHash(password);
    console.log(hashPassword);

    const newAdmin = new adminModel({
      name,
      email,
      password: hashPassword,
      is_admin: true,
    });

    await newAdmin.save();

    newAdmin.password = null;

    res.status(201).json({
      message: "Admin successfully created",
      data: newAdmin,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", success: true, error: false });
  }
};
