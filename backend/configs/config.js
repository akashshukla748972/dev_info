import dotenv from "dotenv";
dotenv.config();

const global_variable = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  jwt_secret: process.env.JWT_SECRET,
};

export default global_variable;
