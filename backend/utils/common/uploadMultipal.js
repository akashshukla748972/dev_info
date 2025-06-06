import CustomError from "../CustomError.js";
import { v2 as cloudinary } from "cloudinary";

export const uploadMultipalFile = async (files = [], folder) => {
  const allFile = files.files;
  try {
    const uploads = await Promise.all(
      allFile.map((file) =>
        cloudinary.uploader.upload(file.tempFilePath, {
          resource_type: "auto",
          folder: folder,
        })
      )
    );

    return { uploads, isSuccess: true, isError: false };
  } catch (error) {
    console.error(`Error while uploading multipal image: ${error.message}`);
    return {
      error: new CustomError("Internal server error, Try again", 500),
      isSuccess: false,
      isError: true,
    };
  }
};
