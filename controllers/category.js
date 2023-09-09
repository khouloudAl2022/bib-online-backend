const Book = require("../models/book");
const category = require("../models/category");

exports.CreateCat = async (req, res) => {
  const { nameCat, bookIds } = req.body;
  try {
    const books = await Book.find({ _id: { $in: bookIds } }); // reference

    const cat = await category.create({ nameCat, listofbooks: books });
    res.status(200).send({ message: "category added successfully", cat });
  } catch (error) {
    res.status(500).send({ message: error.message || "Server error!" });
  }
};
