import educationModel from "../../models/education.model.js";
import CustomError from "../../utils/CustomError.js";

export const handleCreateEducation = async (req, res, next) => {
  try {
    const { id } = req.user;
    const {
      title,
      institution,
      location,
      startDate,
      endDate,
      grade,
      description,
    } = req.body;

    const errorFields = [];
    if (!title?.trim()) errorFields.push("Title");
    if (!institution?.trim()) errorFields.push("Institution");
    if (!startDate?.trim()) errorFields.push("Start Date");

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

    const isDuplicateTitle = await educationModel.findOne({
      createdBy: id,
      title: title.trim(),
    });

    if (isDuplicateTitle) {
      return next(new CustomError("Education title already exists", 409));
    }

    const createFields = {
      title: title.trim(),
      institution: institution.trim(),
      startDate: new Date(startDate.trim()),
      createdBy: id,
    };

    if (location) createFields.location = location.trim();
    if (endDate) {
      createFields.endDate = new Date(endDate.trim());
      createFields.isCurrent = false;
    } else {
      createFields.isCurrent = true;
    }
    if (grade) createFields.grade = grade.trim();
    if (description) createFields.description = description.trim();

    const newEducation = await educationModel.create(createFields);

    return res.status(201).json({
      message: "New education added successfully.",
      data: newEducation,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error("Error while creating education:", error);
    return next(new CustomError("Internal server error", 500));
  }
};
