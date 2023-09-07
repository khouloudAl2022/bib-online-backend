const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const connectDb = require("./config/connectDb");

const app = express();

require("dotenv").config();

connectDb();

app.listen(process.env.PORT || 5001, () => {
  console.log(`Your server is running on ${process.env.PORT}`);
});
