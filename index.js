const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const connectDb = require("./config/connectDb");
const authApi = require("./routes/auth");
require("dotenv").config();
connectDb();

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use("/api/auth", authApi);

app.listen(process.env.PORT || 5001, () => {
  console.log(`Your server is running on ${process.env.PORT}`);
});
