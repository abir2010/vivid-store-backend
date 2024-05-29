const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { defaultImgPath } = require("../secret");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      maxlength: [
        31,
        "The length of the user name can be maximum 31 chracters",
      ],
      minlength: [3, "The length of the user name can be minimum 3 chracters"],
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.−]?\w+)*@\w+([\.−]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please write a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      minlength: [6, "The length of the user name can be minimum 6 chracters"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image: {
      type: String,
      default: defaultImgPath,
    },
    address: {
      type: String,
      required: [true, "User address is required"],
    },
    phone: {
      type: String,
      required: [true, "User phone is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("Users", userSchema);

module.exports = User;
