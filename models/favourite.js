const mongoose = require("mongoose");

const Favourite = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favourite", Favourite);
