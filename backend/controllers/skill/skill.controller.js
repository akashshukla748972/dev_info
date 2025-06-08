import skillModel from "../../models/skill.model.js";
import CustomError from "../../utils/CustomError.js";

export const handleCreateSkill = async (req, res, next) => {
  try {
    const { name, level, category, subCategory, description } = req.body;

    const errorFields = [];
    if (!name?.trim()) errorFields.push("Name");
    if (!level?.trim()) errorFields.push("Level");
    if (!category?.trim()) errorFields.push("Category");

    if (errorFields.length > 0) {
      return next(
        new CustomError(
          `${errorFields.join(", ")} ${
            errorFields.length == 1 ? "is" : "are"
          } required`,
          400
        )
      );
    }

    const validLevels = ["Beginner", "Intermediate", "Advanced"];
    if (!validLevels.includes(level)) {
      return next(
        new CustomError(`Level must be one of: ${validLevels.join(", ")}`, 400)
      );
    }

    const validCategory = [
      "Frontend",
      "Backend",
      "Database",
      "Additional Tool",
    ];
    if (!validCategory.includes(category)) {
      return next(
        new CustomError(
          `Category must be one of: ${validCategory.join(", ")}`,
          400
        )
      );
    }

    const isUinqueName = await skillModel.findOne({
      createdBy: req?.user.id,
      name,
    });
    if (isUinqueName) {
      return next(new CustomError("The skill name already exist", 409));
    }

    const newSkill = await skillModel.create({
      name: name.trim(),
      level: level.trim(),
      category: category.trim(),
      subCategory: subCategory?.trim() || undefined,
      description: description?.trim() || undefined,
      createdBy: req.user?.id,
    });

    return res.status(201).json({
      message: "Skill added successfully.",
      data: newSkill,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error("Error while creating skill:", error);
    return next(new CustomError("Internal server error", 500));
  }
};

export const handleGetAllSkill = async (req, res, next) => {
  try {
    const { id } = req?.user;
    const allSkills = await skillModel.find({ isActive: true, createdBy: id });
    if (allSkills.length == 0) {
      return next(new CustomError("Skill not found.", 404));
    }

    return res.status(200).json({
      message: "Getting all skill successfully.",
      data: allSkills,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error("Error while creating skill:", error);
    return next(new CustomError("Internal server error", 500));
  }
};
