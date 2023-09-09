const { CreateCat } = require("../controllers/category");
const { downloadExcelFile } = require("../controllers/createExcel");
const { isAdmin } = require("../middleware/verifyAdmin");

const router = require("express").Router();
router.post("/add", CreateCat);
router.get("/downloadExcel", isAdmin, downloadExcelFile);

module.exports = router;
