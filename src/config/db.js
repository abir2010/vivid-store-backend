const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");

const connectDB = async (options = {}) => {
  try {
    await mongoose.connect(mongodbURL, options);
    console.log("Connection to MongoDB is successful.");

    mongoose.connection.on("error", () => {
      console.error("DB connection error :", error);
    });
  } catch (error) {
    console.error("Couldn't connect to DB", error.toString());
  }
};

module.exports = connectDB;
