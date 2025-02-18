import express from "express";
import fileUpload from "express-fileupload";
import adminRouter from "./routes/admin.router.js";

const app = express();

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/admin", adminRouter);

export default app;
