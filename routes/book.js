const passport = require("passport");
const { AddBook, DownloadFile, Getbooks } = require("../controllers/book");
const upload = require("../middleware/multer");
const router = require("express").Router();
// router.route("/").get(Getbooks).post((upload.single("file")),AddBook)

router.post("/", upload.single("file"), AddBook);

router.get(
  "/getbooks",
  passport.authenticate("bearer", { session: false }),
  Getbooks
);
router.get(
  "/downloadfile/:id",
  passport.authenticate("bearer", { session: false }),
  DownloadFile
);

module.exports = router;
