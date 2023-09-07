const { RegisterUser } = require("../controllers/auth");

const router = require("express").Router();

router.post("/register", RegisterUser);

module.exports = router;
