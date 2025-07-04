import userModel from "../../models/user.model.js";
import CustomError from "../../utils/CustomError.js";
import { genHash, verifyPassword } from "../../utils/genHash.js";
import generatedOtp from "../../utils/genOtp.js";
import { getToken } from "../../utils/jwtToken.js";
import { sendEmail } from "../../utils/mailer.js";

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
      sameSite: "none",
      maxAge: 10 * 60 * 60 * 1000,
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
        status: "Active",
        lastLogin: new Date(),
      });
    } else if (user && !user.password && !user.role == "Client") {
      (user.password = hashPassword),
        (user.name = name),
        (user.role = "Client");
      user.status = "Active";
      (user.lastLogin = new Date()), await user.save();
    } else {
      return next(new CustomError("User alredy exist, Please login.", 409));
    }

    return res.status(201).json({
      message: "Registration completed, now you can login",
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

    const otp = generatedOtp();
    const expireTime = new Date() + 10 * 60 * 1000;

    await userModel.findByIdAndUpdate(user._id, {
      otp: otp,
      otpExpiry: new Date(expireTime).toISOString(),
    });

    const response = await sendEmail(user.email, "OTP Verification", otp);

    if (!response?.isSuccess) {
      return next(response.isError);
    }

    return res.status(201).json({
      message: "Otp has sent on your email",
      email,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error("Error while created client:", error);
    return next(new CustomError("Internal server error", 500));
  }
};

export const handleVerifyOtp = async (req, res, next) => {
  try {
    const { otp, email } = req.body;

    if (!otp) return next(new CustomError("OTP is required.", 400));
    if (!email) return next(new CustomError("Email is required.", 400));

    const getUserData = await userModel.findOne({ email }).select("-password");

    const currentTime = new Date().toISOString();

    if (getUserData.otpExpiry < currentTime) {
      return next(new CustomError("OTP is expired.", 400));
    }

    if (otp !== getUserData.otp) {
      return next(new CustomError("Invalid OTP.", 400));
    }

    const user = await userModel
      .findByIdAndUpdate(
        getUserData._id,
        {
          otp: "",
          otpExpiry: "",
          isValidEmail: true,
          status: "Active",
          lastLogin: new Date(),
        },
        { new: true }
      )
      .select("-password");

    const payLoad = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    const token = await getToken(payLoad, "10d");
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 10 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User logged in successfully.",
      token,
      isSuccess: true,
      isError: false,
    });
  } catch (error) {
    console.error("Error while verifing OTP:", error);
    return next(new CustomError("Internal server error", 500));
  }
};
