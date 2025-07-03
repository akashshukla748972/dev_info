import nodemailer from "nodemailer";
import { getOtpEmailTemplate } from "./templates.js";
import global_variable from "../configs/config.js";
import CustomError from "../utils/CustomError.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: global_variable.smtp_email,
    pass: global_variable.smtp_pass,
  },
});

export const sendEmail = async (to, subject, otp) => {
  try {
    const info = await transporter.sendMail({
      from: '"Devinfo Tech Solutions" <devinfotechsolutions@gmail.com>',
      to,
      subject,
      html: getOtpEmailTemplate(otp),
    });

    return {
      message: "OTP has been sent to your email.",
      isSuccess: true,
      isError: false,
    };
  } catch (error) {
    console.error("Error while sending OTP.", error);
    return {
      isSuccess: false,
      isError: new CustomError("OTP send faild.", 500),
    };
  }
};
