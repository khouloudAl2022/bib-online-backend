const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nameCat: { type: String, required: true },
    listofbooks: [{ type: mongoose.Types.ObjectId, ref: "Book" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
