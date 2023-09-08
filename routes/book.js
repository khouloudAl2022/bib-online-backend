const { AddBook, DownloadFile } = require("../controllers/book");

const router = require("express").Router();
router.post("/addbook", AddBook);
router.get("/downloadFile", DownloadFile);

module.exports = router;
