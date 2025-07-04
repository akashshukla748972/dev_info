import jwt from "jsonwebtoken";
import global_variable from "../configs/config.js";

export const getToken = async (payLoad, exp) => {
  try {
    if (!payLoad) {
      console.log("Payload required");
      return null;
    }
    const token = await jwt.sign(payLoad, global_variable.jwt_secret, {
      expiresIn: exp,
    });
    return token;
  } catch (error) {
    console.error("Error while generating token:", error);
    return null;
  }
};

export const verifyToken = async (token) => {
  try {
    if (!token) {
      console.log("Token not found");
      return null;
    }

    const verify = await jwt.verify(token, global_variable.jwt_secret);
    return verify;
  } catch (error) {
    console.log("Error verifying token");
    return null;
  }
};
