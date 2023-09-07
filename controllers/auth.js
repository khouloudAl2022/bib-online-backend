//TODO: to ask : :p errors , send vs json ,

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

exports.Login = async (req, res) => {
  try {
    const found = await User.findOne({ email: req.body.email });
    if (found) {
      const validPassword = bcrypt.compareSync(
        req.body.password,
        found.password
      );
      if (validPassword) {
        const payload = {
          userId: found._id,
          isAdmin: found.isAdmin,
        };
        const token = jwt.sign(payload, process.env.SECRETKEY, {
          expiresIn: "4d",
        });
        res.json({ message: "User login successfully", token: token });
      } else {
        res.status(400).json({ message: "Email or password incorrect" });
      }
    } else {
      res.status(400).json({ message: "Email or password incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Error server" });
  }
};
