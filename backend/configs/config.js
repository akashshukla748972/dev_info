import dotenv from "dotenv";
dotenv.config();

const global_variable = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
};

export default global_variable;
