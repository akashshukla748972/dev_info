import { v2 as cloudinary } from "cloudinary";
import adminModel from "../../models/admin.model.js";
import CustomError from "../../utils/CustomError.js";

export const handleUpdateProfilePhoto = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req?.files?.avatar) {
      const { avatar } = req.files;
      console.log("Avatar:", avatar);
      const allowedFormats = ["image/jpg", "image/png", "image/jpeg"];

      if (!allowedFormats.includes(avatar.mimetype)) {
        return next(
          new CustomError("Avatar allowed type is jpg, png, or jpeg", 400)
        );
      }
    }

    let cloudinaryResponse = null;
    if (req.files?.avatar) {
      cloudinaryResponse = await cloudinary.uploader.upload(
        req.files.avatar.tempFilePath,
        {
          folder: "admin/ profile",
        }
      );
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error:", cloudinaryResponse.error);
        return next(new CustomError("Failed to upload image, Try again.", 500));
      }
    }

    const updateOnDatabase = await adminModel
      .findByIdAndUpdate(
        id,
        {
          avatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.url,
          },
        },
        { new: true }
      )
      .select("-password");

    return res.status(200).json({
      message: "Profile photo updated successfully.",
      data: updateOnDatabase,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error(`Error while updating profile photo: ${error}`);
    return next(new CustomError("Internal server error, Try again.", 500));
  }
};
