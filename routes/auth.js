const { RegisterUser, Login } = require("../controllers/auth");

const router = require("express").Router();

router.post("/register", RegisterUser);
router.post("/login", Login);

module.exports = router;
