import express from "express";
import fileUpload from "express-fileupload";
import adminRouter from "./routes/admin.router.js";
import connectToCloudinary from "./configs/cloudinary_config.js";

const app = express();

connectToCloudinary();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

connectToCloudinary();

app.use("/api/admin", adminRouter);

export default app;
