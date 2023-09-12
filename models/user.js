const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    msv: String,
    fullname: {
      firstname: String,
      lastname: String,
    },
    password: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      city: String,
      district: String,
      ward: String,
      street: String,
      more: String,
    },
    role: {
      type: "string",
      enum: ["user", "staff", "admin"],
      default: "user",
    },
    sex: {
      type: String,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
