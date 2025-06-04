import { v2 as cloudinary } from "cloudinary";
import CustomError from "../CustomError.js";

export const uploadAvatarInCloudinary = async (file, folder) => {
  try {
    const response = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: folder,
    });
    if (!response || response.error) {
      console.error("Cloudinary Error:", response.error);
      return {
        isSuccess: false,
        isError: true,
        message: "Failed to upload image, Try again.",
      };
    }

    return { response, isSuccess: true, isError: false };
  } catch (error) {
    console.error(`Errorr while uploading image: ${error}`);
    return {
      isSuccess: false,
      isError: true,
      message: "Failed to upload image, Try again.",
    };
  }
};
