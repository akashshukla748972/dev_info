import { v2 as cloudinary } from "cloudinary";
import adminModel from "../models/admin.model.js";
import { genHash, verifyPassword } from "../utils/genHash.js";
import { getToken } from "../utils/jwtToken.js";



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
