const mongoose = require("mongoose");

const Post_product = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    location: {
      city: String,
      district: String,
    },
    images: [{ url: String }],
    title: String,
    price: Number,
    category: String,
    description: String,
    status: {
      type: String,
      enum: ["pending", "success", "access", "done", "refuse"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", Post_product);
