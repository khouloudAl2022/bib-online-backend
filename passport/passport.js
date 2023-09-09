const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jsonwebtoken");
const User = require("../models/user");

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const decodedData = jwt.verify(token, process.env.SECRETKEY);
      const user = await User.findById(decodedData.userId);
      
      if (!user) {
        return done(null, false);
      }
      
      return done(null, user, { scope: "all" });
    } catch (err) {
      return done(err);
    }
  })
);
