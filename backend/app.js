import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import morgan from "morgan";

import connectToCloudinary from "./configs/cloudinary_config.js";
import errorHandler from "./middlewares/common/errorHandler.middleware.js";
import adminRouter from "./routes/admin/admin.router.js";
import authRouter from "./routes/auth/auth.routes.js";
import CustomError from "./utils/CustomError.js";
import cookieParser from "cookie-parser";

const app = express();

connectToCloudinary();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

connectToCloudinary();

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use((req, res, next) => {
  next(new CustomError("Page not found, Try again.", 404));
});

app.use(errorHandler);

export default app;
