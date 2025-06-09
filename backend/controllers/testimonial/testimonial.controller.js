import testimonialModel from "../../models/testimonial.model.js";
import { uploadAvatarInCloudinary } from "../../utils/common/uploadAvatar.js";
import CustomError from "../../utils/CustomError.js";

export const handleCreateTestimonial = async (req, res, next) => {
  try {
    const { name, designation, company, message, project_id, rating } =
      req.body;

    const errorFields = [];
    if (!name?.trim()) errorFields.push("Name");
    if (!designation?.trim()) errorFields.push("Designation");
    if (!message?.trim()) errorFields.push("Message");

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

    const createFields = {
      name: name?.trim(),
      designation: designation?.trim(),
      message: message?.trim(),
    };

    if (company) createFields.company = company.trim();
    if (project_id) createFields.project = project_id.trim();
    if (rating && !isNaN(rating)) createFields.rating = rating;

    const client_image = req?.files?.client_image;
    if (!client_image) {
      return next(new CustomError("Client Image is required.", 400));
    }

    const allowedFormats = ["image/jpg", "image/png", "image/jpeg"];

    if (!allowedFormats.includes(client_image.mimetype)) {
      return next(
        new CustomError("Client image allowed type is jpg, png, or jpeg", 400)
      );
    }

    const cloudinaryResponse = await uploadAvatarInCloudinary(
      client_image,
      "def_info/testimonial/client/profile"
    );

    if (cloudinaryResponse.isError) {
      return next(new CustomError(cloudinaryResponse.message, 500));
    }

    const { response } = cloudinaryResponse;
    createFields.image = {
      public_id: response?.public_id,
      url: response?.url,
    };

    const newFeedback = await testimonialModel.create(createFields);

    return res.status(201).json({
      message: "Feedback added successfully.",
      data: newFeedback,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error("Error while creating testimonial feedback:", error);
    return next(new CustomError("Internal server error", 500));
  }
};

export const handleGetAllTestimonialFeedback = async (req, res, next) => {
  try {
    const getAllTestimonial = await testimonialModel.find();
    if (getAllTestimonial.length == 0) {
      return next(new CustomError("Feedback not found.", 404));
    }
    return res.status(200).json({
      message: "Getting all testimonial feedback successfully.",
      data: getAllTestimonial,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error("Error while getting all testimonial feedback:", error);
    return next(new CustomError("Internal server error", 500));
  }
};

export const handleDeleteTestimonialFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.user;

    if (role !== "super_admin") {
      return next(new CustomError("Unauthorized User", 401));
    }

    const deletedFeedback = await testimonialModel.findByIdAndDelete(id);
    if (!deletedFeedback) {
      return next(new CustomError("Feedback not found.", 404));
    }
    return res.status(200).json({
      message: "Feedback deleted successfully.",
      data: deletedFeedback,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error("Error while getting all testimonial feedback:", error);
    return next(new CustomError("Internal server error", 500));
  }
};

export const handleUpdateTestimonialFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.user;

    const { visibility } = req.body;
    console.log(visibility);
    if (visibility === undefined || visibility === null) {
      return next(new CustomError("Visivility is required.", 400));
    }

    if (role !== "super_admin") {
      return next(new CustomError("Unauthorized User", 401));
    }

    const updatedFeedback = await testimonialModel.findByIdAndUpdate(
      id,
      { visibility },
      { new: true }
    );
    if (!updatedFeedback) {
      return next(new CustomError("Feedback not found.", 404));
    }
    return res.status(200).json({
      message: "Feedback updated successfully.",
      data: updatedFeedback,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error("Error while getting all testimonial feedback:", error);
    return next(new CustomError("Internal server error", 500));
  }
};
