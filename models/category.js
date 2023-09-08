const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    nameCat: { type: String, required: true },
    listofbooks: [{ type: mongoose.Types.ObjectId, ref: "Book" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Category", categorySchema);
