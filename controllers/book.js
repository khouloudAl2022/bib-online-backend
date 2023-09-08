//FIXME: same books added

const Book = require("../models/book");

const AddBook = async (req, res) => {
  const pdf = req.file.path;
  try {
    await Book.create({ ...req.body, content: pdf }); // (...)is used to create a new object that combines the properties of req.body and adds the content property with the value of pdf
    res.status(200).send({ message: "book created successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message || "Server error!" });
  }
};
const DownloadFile = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send({ message: "No book found" });
    }
    const file = book.pdf;
    const filePath = path.join(__dirname, `../${file}`);
    res.download(filePath); // function transfers the file at the path as an ‘attachment’. Typically, browsers will prompt the user to download.
  } catch (error) {}
};

module.exports = { AddBook, DownloadFile };
