import experienceModel from "../../models/experience.model.js";
import CustomError from "../../utils/CustomError.js";

export const handleCreateExperience = async (req, res, next) => {
  try {
    const { id } = req.user;
    const {
      title,
      company,
      location,
      description,
      startDate,
      endDate,
      technologies,
    } = req.body;

    const errorFields = [];

    if (!title?.trim()) errorFields.push("Title");
    if (!company?.trim()) errorFields.push("Company");
    if (!location?.trim()) errorFields.push("Location");
    if (!description?.trim()) errorFields.push("Description");
    if (!startDate?.trim()) errorFields.push("Start Date");

    if (errorFields.length > 0) {
      return next(
        new CustomError(
          `${errorFields.join(", ")} ${
            errorFields.length == 1 ? "is" : "are"
          } required.`,
          400
        )
      );
    }

    const isDuplicateTitle = await experienceModel.findOne({
      title: title,
      createdBy: id,
    });
    if (isDuplicateTitle) {
      return next(
        new CustomError("Experience title alredy exist, Try again.", 409)
      );
    }

    const isCurrentValue = endDate ? false : true;

    const newExperience = await experienceModel.create({
      title,
      company,
      location,
      description,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      isCurrent: isCurrentValue,
      createdBy: id,
    });

    return res.status(201).json({
      message: "New experience created successfully.",
      data: newExperience,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error("Error while creating experience:", error);
    return next(new CustomError("Internal server error", 500));
  }
};

export const handleGetAllExperience = async (req, res, next) => {
  try {
    const { id } = req.user;
    const allExperience = await experienceModel.find({
      createdBy: id,
      isActive: true,
    });
    if (allExperience.length == 0) {
      return next(new CustomError("Experience not found.", 404));
    }

    return res.status(200).json({
      message: "Getting all experience successfully",
      data: allExperience,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error("Error while getting all experience:", error);
    return next(new CustomError("Internal server error", 500));
  }
};
