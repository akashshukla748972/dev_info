import jwt from "jsonwebtoken";
import global_variable from "../../configs/config.js";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: Please login",
      isSuccess: false,
      isError: true,
    });
  }

  try {
    const decode = jwt.verify(token, global_variable.jwt_secret);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Unauthorized: Invalid or expired token",
      isSuccess: false,
      isError: true,
    });
  }
};
