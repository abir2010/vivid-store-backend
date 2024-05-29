require("dotenv").config();

const serverPort = process.env.PORT || 3002;
const mongodbURL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/vivid-store";
const defaultImgPath =
  process.env.DEFAULT_USER_IMAGE_PATH || "public/images/users/default.jpg";

module.exports = { serverPort, mongodbURL, defaultImgPath };
