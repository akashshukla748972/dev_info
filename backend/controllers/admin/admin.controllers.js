import adminModel from "../../models/admin.model.js";
import CustomError from "../../utils/CustomError.js";
import { uploadAvatarInCloudinary } from "../../utils/common/uploadAvatar.js";

export const handleUpdateProfilePhoto = async (req, res, next) => {
  try {
    const { id } = req.user;
    const file = req?.files?.avatar;

    if (file) {
      const { avatar } = req.files;
      const allowedFormats = ["image/jpg", "image/png", "image/jpeg"];

      if (!allowedFormats.includes(avatar.mimetype)) {
        return next(
          new CustomError("Avatar allowed type is jpg, png, or jpeg", 400)
        );
      }
    }

    const cloudinaryResponse = await uploadAvatarInCloudinary(
      file,
      "admin/ profile"
    );

    console.log(cloudinaryResponse);
    if (cloudinaryResponse.isError) {
      return next(new CustomError(cloudinaryResponse.message, 500));
    }

    const { response } = cloudinaryResponse;

    const updateOnDatabase = await adminModel
      .findByIdAndUpdate(
        id,
        {
          avatar: {
            public_id: response.public_id,
            url: response.url,
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
