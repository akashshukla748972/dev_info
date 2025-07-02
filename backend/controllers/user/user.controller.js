import userModel from "../../models/user.model.js";
import CustomError from "../../utils/CustomError.js";
import { getToken } from "../../utils/jwtToken.js";

export const handleCreateSubscriber = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    if (!email) {
      return next(new CustomError("Email is required.", 400));
    }

    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return next(
        new CustomError("Subscriber already exist, Try another email.", 409)
      );
    }

    const newUser = await userModel.create({
      name: name || null,
      email,
      isSubscribed: true,
    });

    const user = await userModel.findById(newUser._id).select("-password");

    const payLoad = {
      id: user._id,
      name: user.name || user.email.charAt(0),
      email: user.email,
      role: user.role,
    };
    const token = await getToken(payLoad);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "Successfully subscribed.",
      token,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error("Error while created subscriber:", error);
    return next(new CustomError("Internal server error", 500));
  }
};
