const mongoose = require("mongoose");

const connectToDB = () => {
  console.log("here", process.env.MONGO_URI);
  const db = mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("database connected!");
  });
};

module.exports = connectToDB;
