const { AddBook, DownloadFile, Getbooks } = require("../controllers/book");
const upload = require("../middleware/multer");

const router = require("express").Router();
// router.route("/").get(Getbooks).post((upload.single("file")),AddBook)
router.post("/", upload.single("file"), AddBook);
router.get("getbooks", Getbooks);
router.get("/downloadfile", DownloadFile);

module.exports = router;
