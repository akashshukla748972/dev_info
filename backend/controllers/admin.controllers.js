import { v2 as cloudinary } from "cloudinary";
import bcrypt, { hash } from "bcrypt";
import adminModel from "../models/admin.model.js";
import { genHash, verifyPassword } from "../utils/genHash.js";
import { getToken } from "../utils/jwtToken.js";

export const handleCreateUser = async (req, res) => {
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

    const newAdmin = new adminModel({
      name,
      email,
      password: hashPassword,
      is_admin: true,
    });

    await newAdmin.save();

    const payLoad = {
      id: newAdmin._id,
      name: newAdmin.name,
      email: newAdmin.email,
    };
    const token = await getToken(payLoad);

    newAdmin.password = null;
    res.cookie("token", token);

    res.status(201).json({
      message: "Admin successfully created",
      data: newAdmin,
      token,
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

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const errorField = [];
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
    const user = await adminModel.findOne({
      email,
    });

    const matchPassword = await verifyPassword(
      password,
      user?.password || null
    );

    console.log(matchPassword);

    if (!user || !matchPassword) {
      return res.status(400).json({
        message: "Email or password is wrong",
        success: false,
        error: true,
      });
    }

    const payLoad = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = await getToken(payLoad);

    user.password = null;
    res.cookie("token", token);

    return res.status(200).json({
      message: "Admin logged in successfully",
      data: user,
      token,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error while login");
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: true,
    });
  }
};

export const handleEditProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (req?.files?.avatar) {
      const { avatar } = req.files;
      console.log("Avatar:", avatar);
      const allowedFormats = ["image/jpg", "image/png", "image/jpeg"];

      if (!allowedFormats.includes(avatar.mimetype)) {
        return res.status(400).json({
          error: "Avatar allowed type is jpg, png, or jpeg",
        });
      }
    }

    const { name, phone } = req.body;

    const admin = await adminModel.findById(id);
    if (!admin) {
      return res.status(401).json({
        message: "Not authorized",
        success: false,
        error: true,
      });
    }

    let cloudinaryResponse = null;
    if (req.files?.avatar) {
      cloudinaryResponse = await cloudinary.uploader.upload(
        req.files.avatar.tempFilePath
      );
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.log("Cloudinary Error:", cloudinaryResponse.error);
        return res.status(500).json({
          message: "Failed to upload image",
          success: false,
          error: true,
        });
      }
    }

    const updatedAdmin = await adminModel.findByIdAndUpdate(
      id,
      {
        name,
        phone,
        avatar: cloudinaryResponse
          ? {
              public_id: cloudinaryResponse.public_id,
              url: cloudinaryResponse.url,
            }
          : admin.avatar,
        is_admin: true,
        is_active: true,
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (updatedAdmin) {
      return res.status(200).json({ data: updatedAdmin });
    } else {
      return res.status(400).json({
        message: "Failed to update profile",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    console.error("Error while updating profile:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: true,
    });
  }
};
