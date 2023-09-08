const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const connectDb = require("./config/connectDb");
const authApi = require("./routes/auth");
const booksApi = require("./routes/book");
require("dotenv").config();
connectDb();

const app = express();
app.use(morgan("tiny"));
app.use(express.json());

app.use(
  session({
    resave: true,
    secret: process.env.SECRETKEY,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authApi);
app.use("/api/books", booksApi);

app.listen(process.env.PORT || 5001, () => {
  console.log(`Your server is running on ${process.env.PORT}`);
});
