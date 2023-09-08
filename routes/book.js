const { AddBook } = require("../controllers/book");

const router = require("express").Router();
router.post("/addbook", AddBook);
module.exports = router;
