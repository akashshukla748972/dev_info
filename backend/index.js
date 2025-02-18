const express = require("express");
const dotenv = require("dotenv");
const connectToDB = require("./configs/db");
const adminRouter = require("./routes/admin.router");
dotenv.config();
const fileUpload = require("express-fileupload");
const { v2 } = require("cloudinary");

connectToDB();
const app = express();
const port = process.env.PORT;

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/admin", adminRouter);

v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

app.listen(port, () => {
  console.log(`server runnig on port : ${port}`);
});
