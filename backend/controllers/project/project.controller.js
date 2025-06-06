import projectModel from "../../models/project.model.js";
import { uploadMultipalFile } from "../../utils/common/uploadMultipal.js";
import CustomError from "../../utils/CustomError.js";

export const handleCreateProject = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      const errorField = [];
      if (!title) errorField.push("Tile");
      if (!description) errorField.push("Description");
      if (errorField.length > 0) {
        return next(
          new CustomError(
            `${errorField.join(", ")} ${
              errorField.length == 1 ? "is" : "are"
            } required`,
            400
          )
        );
      }
    }
    const newProject = await projectModel.create({
      user: req?.user?.id,
      title,
      description,
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
