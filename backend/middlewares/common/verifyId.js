import mongoose, { Schema } from "mongoose";
import CustomError from "../../utils/CustomError.js";

export const verifyObjectId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isValidObjectId = await mongoose.Types.ObjectId.isValid(id);
    console.log("Valid", isValidObjectId);
    if (!isValidObjectId) {
      return next(new CustomError("Invalid object id, Try again.", 400));
    }
    next();
  } catch (error) {
    console.error(`Error while verifing object id, Try again.`, 500);
  }
};
