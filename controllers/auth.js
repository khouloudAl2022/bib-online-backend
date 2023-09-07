const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.RegisterUser = async (req, res) => {
  try {
    const found = await User.findOne({ email: req.body.email });
    if (found) {
      res.status(400).send({ message: "User already exist" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashpassword;
    await User.create(req.body);
    res.status(200).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error server" });
  }
};

// exports.login=async(req,res)=>{
// try {
//     const user=user.
// } catch (error) {

// }
// }
