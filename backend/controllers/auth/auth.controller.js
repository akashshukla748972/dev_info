import adminModel from "../../models/admin.model.js";
import userModel from "../../models/user.model.js";
import CustomError from "../../utils/CustomError.js";
import { genHash, verifyPassword } from "../../utils/genHash.js";
import { getToken } from "../../utils/jwtToken.js";

export const handleCreateUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      const errorField = [];
      if (!name) errorField.push("Name");
      if (!email) errorField.push("Email");
      if (!password) errorField.push("Password");

      return next(
        new CustomError(
          `${errorField.length > 0 && errorField.join(", ")} ${
            errorField.length == 1 ? "is" : "are"
          } required, Try again`,
          400
        )
      );
    }

    const isEmailExist = await adminModel.findOne({ email });
    if (isEmailExist) {
      return next(
        new CustomError("Email already exist in database, Try again", 409)
      );
    }

    const isSuperAdmin = await adminModel.findOne({ role: "super_admin" });
    const role = isSuperAdmin ? "admin" : "super_admin";

    const hashPassword = await genHash(password);

    const newAdmin = new adminModel({
      name,
      email,
      password: hashPassword,
      role,
    });

    await newAdmin.save();

    const payLoad = {
      id: newAdmin._id,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
    };
    const token = await getToken(payLoad);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "New user successfully created.",
      token,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error(error);
    return next(new CustomError("Internal server error, Try agian.", 500));
  }
};

export const handleLoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const errorField = [];
      if (!email) errorField.push("Email");
      if (!password) errorField.push("Password");

      return next(
        new CustomError(
          `${errorField.length > 0 && errorField.join(" And ")} ${
            errorField.length == 1 ? "is" : "are"
          } required`,
          400
        )
      );
    }
    const user = await adminModel.findOne({
      email,
    });

    const matchPassword = await verifyPassword(
      password,
      user?.password || null
    );

    if (!user || !matchPassword) {
      return next(new CustomError("Email or password is wrong", 400));
    }

    const payLoad = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const token = await getToken(payLoad, "7d");

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User logged in successfully",
      token,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error(`Error while login user: ${error}`);
    return next(new CustomError("Internal server error", 500));
  }
};

export const handleCheckAuth = async (req, res, next) => {
  try {
    console.log("hello");
    const user = req?.user;
    let userData;

    if (user.role != "User" && user.role != "Client") {
      userData = await adminModel.findById(user.id).select("-password");
    } else {
      userData = await userModel.findById(user.id).select("-password");
    }
    return res.status(200).json({
      message: "Authrized user.",
      isSuccess: true,
      isError: false,
      data: userData,
    });
  } catch (error) {
    console.error(`Error while varifing user, Try again`);
    return next(new CustomError("Internal server error", 500));
  }
};

export const handleLogoutUser = async (req, res, next) => {
  try {
    const user = req?.user;
    await userModel.findByIdAndUpdate(user.id, {
      status: "inactive",
    });
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      message: "User logged out successfully.",
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error(`Error while varifing user, Try again`);
    return next(new CustomError("Internal server error", 500));
  }
};
