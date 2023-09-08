//FIXME: same books added

const Book = require("../models/book");
const path = require("path");

const AddBook = async (req, res) => {
  const { title, desc, author } = req.body;
  const file = req.file.path;
  console.log("fiiiiiiiiiiiile", file);
  try {
    await Book.create({ title, desc, author, content: file });
    res.status(200).send({ message: "book created successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message || "Server error!" });
  }
};
const Getbooks = async (req, res) => {
  try {
    const books = await Book.find();
    console.log(books);
    res.status(200).send(books);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error!" });
  }
};

const DownloadFile = async (req, res) => {
  const { id } = req.params; //extract a parameter named "id" from the req.params object
  try {
    const book = await Book.findById(id);
    // console.log(book);
    if (!book) {
      res.status(404).send({ message: "No book found" });
    }
    const file = book.content;
    // console.log("booooooook", book);
    const filePath = path.join(__dirname, `../${file}`);
    res.download(filePath); // function transfers the file at the path as an ‘attachment’. Typically, browsers will prompt the user to download.
  } catch (error) {
    res.status(500).send({ message: error.message || "Server error!" });
  }
};

module.exports = { AddBook, DownloadFile, Getbooks };
