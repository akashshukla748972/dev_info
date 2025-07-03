import dotenv from "dotenv";
dotenv.config();

const global_variable = {
  port: process.env.PORT,
  mongo_user: process.env.MONGODB_USER,
  mongo_password: process.env.MONGODB_PASSWORD,
  jwt_secret: process.env.JWT_SECRET,
  cloud_name: process.env.CLOUD_NAME,
  cloud_api_key: process.env.CLOUD_API_KEY,
  cloud_api_secret: process.env.CLOUD_SECRET_KEY,
  smtp_email: process.env.SMTP_EMAIL,
  smtp_pass: process.env.SMTP_PASS,
};

export default global_variable;
