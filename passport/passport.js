const passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy
const jwt = require('jsonwebtoken');
const User = require('../models/user');

passport.use(new BearerStrategy(
    (token, done) => {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        User.findById(decodedData.userId, (err, user) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user, { scope: 'all' });
        });
    }
));