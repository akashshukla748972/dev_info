import mongoose from "mongoose";
import global_variable from "./config.js";

const connectToDB = async () => {
  try {
    await mongoose.connect(global_variable.mongo_uri).then(() => {
      console.log("database connected!");
    });
  } catch (error) {
    console.error(`Error while connecting to database: ${error}`);
    process.exit(1);
  }
};

export default connectToDB;
