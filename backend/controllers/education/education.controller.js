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

export const handleGetAllAdminEducation = async (req, res, next) => {
  try {
    const { id } = req.user;
    const adminEducations = await educationModel.find({ createdBy: id });
    if (adminEducations.length == 0) {
      return next(new CustomError("Education not found.", 404));
    }

    return res.status(200).json({
      message: "Getting all admin educations successfully.",
      data: adminEducations,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error("Error while getting all admin education:", error);
    return next(new CustomError("Internal server error", 500));
  }
};

export const handleDeleteEducation = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deletedEducations = await educationModel.findOneAndDelete({
      createdBy: userId,
      _id: id,
    });
    if (!deletedEducations) {
      return next(new CustomError("Education not found.", 404));
    }

    return res.status(200).json({
      message: "Education delete successfully.",
      data: deletedEducations,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error("Error while deleting education:", error);
    return next(new CustomError("Internal server error", 500));
  }
};

export const handleUpdateEducation = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const {
      title,
      institution,
      location,
      startDate,
      endDate,
      grade,
      description,
    } = req.body;

    const updateFields = {
      title: title?.trim(),
      institution: institution?.trim(),
    };
    if (location) updateFields.location = location.trim();
    if (startDate) updateFields.startDate = new Date(startDate);
    if (endDate) {
      updateFields.endDate = new Date(endDate);
      isCurrent: false;
    } else {
      isCurrent: true;
    }

    if (grade) updateFields.grade = grade.trim();
    if (description) updateFields.description = description.trim();

    let updateEducations = null;
    console.log(req?.user?.role);
    if (req?.user?.role == "super_admin") {
      updateEducations = await educationModel.findOneAndUpdate(
        {
          _id: id,
        },
        updateFields,
        { new: true }
      );
    } else {
      updateEducations = await educationModel.findOneAndUpdate(
        {
          createdBy: userId,
          _id: id,
        },
        updateFields,
        { new: true }
      );
    }

    if (!updateEducations) {
      return next(new CustomError("Education not found.", 404));
    }

    return res.status(200).json({
      message: "Education updated successfully.",
      data: updateEducations,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error("Error while updating education:", error);
    return next(new CustomError("Internal server error", 500));
  }
};
