//FIXME: same books added

const Book = require("../models/book");

exports.AddBook = async (req, res) => {
  try {
    await Book.create(req.body);
    req.status(200).send({ message: "book created successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message || "Server error!" });
  }
};
