import mongoose from "mongoose";
import global_variable from "./config.js";

const connectToDB = async () => {
  try {
    await mongoose
      .connect(
        `mongodb+srv://${global_variable.mongo_user}:${global_variable.mongo_password}@cluster0.v4egg5i.mongodb.net/`
      )
      .then(() => {
        console.log("database connected!");
      });
  } catch (error) {
    console.error(`Error while connecting to database: ${error}`);
    process.exit(1);
  }
};

export default connectToDB;
