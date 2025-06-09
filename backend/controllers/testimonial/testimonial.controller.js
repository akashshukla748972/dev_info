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
