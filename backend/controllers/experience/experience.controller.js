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

export const handleDeleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedExperience = await experienceModel.findByIdAndDelete(id);
    if (!deletedExperience) {
      return next(new CustomError("Experience not found.", 404));
    }

    return res.status(200).json({
      message: "Experience deleted successfully",
      data: deletedExperience,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error("Error while getting all experience:", error);
    return next(new CustomError("Internal server error", 500));
  }
};

export const handleUpdateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const {
      title,
      company,
      location,
      description,
      startDate,
      endDate,
      technologies,
      logo,
      isActive,
    } = req.body;

    const updateFields = {};
    if (title) updateFields.title = title.trim();
    if (company) updateFields.company = company.trim();
    if (location) updateFields.location = location.trim();
    if (description) updateFields.description = description.trim();
    if (startDate) updateFields.startDate = new Date(startDate);
    if (endDate) updateFields.endDate = new Date(endDate);
    if (technologies) updateFields.technologies = technologies;
    if (logo) updateFields.logo = logo;
    if (isActive) updateFields.isActive = isActive;
    if (endDate) updateFields.isCurrent = false;

    const updatedExperience = await experienceModel.findOneAndUpdate(
      { _id: id, createdBy: userId },
      updateFields,
      { new: true }
    );
    if (!updatedExperience) {
      return next(new CustomError("Experience not found.", 404));
    }

    return res.status(200).json({
      message: "Experience deleted successfully",
      data: updatedExperience,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error("Error while getting all experience:", error);
    return next(new CustomError("Internal server error", 500));
  }
};
