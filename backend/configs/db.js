import mongoose from "mongoose";
import global_variable from "./config.js";

const connectToDB = () => {
  const db = mongoose.connect(global_variable.mongo_uri).then(() => {
    console.log("database connected!");
  });
};

export default connectToDB;
