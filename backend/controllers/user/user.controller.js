import userModel from "../../models/user.model.js";
import CustomError from "../../utils/CustomError.js";
import { genHash, verifyPassword } from "../../utils/genHash.js";
import { getToken } from "../../utils/jwtToken.js";

export const handleCreateSubscriber = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    if (!email) {
      return next(new CustomError("Email is required.", 400));
    }

    let user = await userModel.findOne({ email }).select("-password");
    if (!user) {
      user = await userModel.create({
        name: name || null,
        email,
        isSubscribed: true,
      });

      user = await userModel.findById(user._id).select("-password");
    }

    const payLoad = {
      id: user._id,
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
export const handleCreateClient = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const errorField = [];
    if (!name) errorField.push("Name");
    if (!email) errorField.push("Email");
    if (!password) errorField.push("Password");

    if (errorField.length > 0) {
      return next(
        new CustomError(
          `${errorField.join(", ")} ${
            errorField.length == 1 ? "is" : "are"
          } required`
        )
      );
    }

    let user = await userModel.findOne({ email });
    const hashPassword = await genHash(password);
    if (!user) {
      user = await userModel.create({
        name,
        email,
        password: hashPassword,
        role: "Client",
        isSubscribed: true,
      });
    } else if (user && !user.password) {
      user.password = hashPassword;
      (user.name = name), (user.role = "Client");

      await user.save();
    }

    user = await userModel.findById(user._id).select("-password");

    const payLoad = {
      id: user._id,
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
    console.error("Error while created client:", error);
    return next(new CustomError("Internal server error", 500));
  }
};
export const handleLoginClient = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const errorField = [];
    if (!email) errorField.push("Email");
    if (!password) errorField.push("Password");

    if (errorField.length > 0) {
      return next(
        new CustomError(
          `${errorField.join(", ")} ${
            errorField.length == 1 ? "is" : "are"
          } required`
        )
      );
    }

    let user = await userModel.findOne({ email });
    const matchPassword = await verifyPassword(
      password,
      user?.password || null
    );
    if (!user || !matchPassword) {
      return next(new CustomError("Email or Password is wrong."));
    }

    const payLoad = {
      id: user._id,
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
      message: "Successfully Loged in.",
      token,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error("Error while created client:", error);
    return next(new CustomError("Internal server error", 500));
  }
};
