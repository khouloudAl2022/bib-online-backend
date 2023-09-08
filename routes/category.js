const { CreateCat } = require("../controllers/category");

const router = require("express").Router();
router.post("/add", CreateCat);

module.exports = router;
