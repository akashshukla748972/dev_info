import { v2 as cloudinary } from "cloudinary";
import global_variable from "./config.js";

const connectToCloudinary = () => {
  cloudinary.config({
    cloud_name: global_variable.cloud_name,
    api_key: global_variable.cloud_api_key,
    api_secret: global_variable.cloud_api_secret,
  });
};

export default connectToCloudinary;
