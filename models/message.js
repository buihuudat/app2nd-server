const mongoose = require("mongoose");

const Message = new mongoose.Schema(
  {
    message: {
      text: String,
      images: Array,
      file: String,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    lastMessage: String,
    status: {
      type: String,
      enum: ["seen", "send"],
      default: "send",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", Message);
