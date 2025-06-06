import projectModel from "../../models/project.model.js";
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
