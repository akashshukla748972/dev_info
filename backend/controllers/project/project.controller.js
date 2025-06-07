import projectModel from "../../models/project.model.js";
import { uploadAvatarInCloudinary } from "../../utils/common/uploadAvatar.js";
import { uploadMultipalFile } from "../../utils/common/uploadMultipal.js";
import CustomError from "../../utils/CustomError.js";

export const handleCreateProject = async (req, res, next) => {
  try {
    const {
      title,
      description,
      client_name,
      start_date,
      end_date,
      difficulty_level,
    } = req.body;
    if (
      !title ||
      !description ||
      !client_name ||
      !start_date ||
      !difficulty_level
    ) {
      const errorFields = [];

      if (!title) errorFields.push("Title");
      if (!description) errorFields.push("Description");
      if (!client_name) errorFields.push("Client Name");
      if (!start_date) errorFields.push("Start Date");
      if (!difficulty_level) errorFields.push("Difficulty Level");

      if (errorFields.length > 0) {
        return next(
          new CustomError(
            `${errorFields.join(", ")} ${
              errorFields.length === 1 ? "is" : "are"
            } required`,
            400
          )
        );
      }
    }

    const file = req?.files?.poster;

    if (!file) {
      return next(new CustomError("Poster is required, Try again.", 400));
    }

    if (file) {
      const { poster } = req.files;
      const allowedFormats = ["image/jpg", "image/png", "image/jpeg"];

      if (!allowedFormats.includes(poster.mimetype)) {
        return next(
          new CustomError("Poster allowed type is jpg, png, or jpeg", 400)
        );
      }
    }

    const isDuplicate = await projectModel.findOne({ title: title });
    if (isDuplicate) {
      return next(
        new CustomError("Project title already exist. try again.", 409)
      );
    }
    const cloudinaryResponse = await uploadAvatarInCloudinary(
      file,
      "/admin/projects/poster"
    );

    if (cloudinaryResponse.isError) {
      return next(new CustomError(cloudinaryResponse.message, 500));
    }

    const { response } = cloudinaryResponse;
    const status = !end_date ? "Pending" : "Fulfilled";
    const check_end_date = !end_date ? null : new Date(end_date);
    const newProject = await projectModel.create({
      user: req?.user?.id,
      title,
      description,
      client_name: client_name,
      difficulty_level: difficulty_level,
      start_date: new Date(start_date),
      end_date: check_end_date,
      status,
      poster: {
        public_id: response.public_id,
        url: response.url,
      },
    });

    return res.status(201).json({
      message: "New project created successfully.",
      data: newProject,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    if (error.code == 11000 && error.keyPattern?.title) {
      return next(new CustomError("Title already exists, try another.", 409));
    }
    console.error(`Error while creating new project: ${error}`);
    return next(new CustomError("Internal server error", 500));
  }
};

export const handleUploadMultipleProjectImage = async (req, res, next) => {
  try {
    const files = req?.files;
    const uploadProjectImage = await uploadMultipalFile(
      files,
      "/admin/projects/images"
    );

    if (uploadProjectImage.isError) {
      return next(uploadProjectImage.error);
    }

    const { uploads } = uploadProjectImage;
    let uploadData = [];
    uploads.map((item) =>
      uploadData.push({
        url: item.secure_url,
        public_id: item.public_id,
      })
    );

    return res.status(200).json({
      message: "Project Image uploaded successfully, Try again.",
      data: uploadData,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error(`Error while uploading project image: ${error}`);
    return next(new CustomError("Internal server error", 500));
  }
};

export const handleGetALLProject = async (req, res, next) => {
  try {
    const { id } = req.user;
    const projects = await projectModel.find({ user: id });
    if (projects.length == 0) {
      return next(new CustomError("Project not found", 404));
    }

    return res.status(200).json({
      message: "Getting all project successfully.",
      data: projects,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error(`Error while uploading project image: ${error}`);
    return next(new CustomError("Internal server error", 500));
  }
};
