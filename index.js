const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const connectDb = require("./config/connectDb");
const authApi = require("./routes/auth");
const booksApi = require("./routes/book");
const catApi = require("./routes/category");

require("dotenv").config();
connectDb();
require("./passport/passport");

const app = express();
app.use(passport.initialize());

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
app.use(
  session({
    resave: true,
    secret: process.env.SECRETKEY,
    saveUninitialized: true,
  })
);
app.use(passport.session());

app.use("/api/auth", authApi);
app.use("/api/books", booksApi);
app.use("/api/categories", catApi);

app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT || 5001, () => {
  console.log(`Your server is running on ${process.env.PORT}`);
});
