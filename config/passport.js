var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, { _id: user._id }) // take out email in production
})

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, 'username', (err, user) => {
    done(null, user)
  })
})

// ==== Register Local Strategy ====
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username'
    },
    function(username, password, done) {
      User.findOne({ username: username }, (err, userMatch) => {
        if (err) {
          return done(err)
        }
        if (!userMatch) {
          return done(null, false, { message: 'Incorrect username' })
        }
        if (!userMatch.checkPassword(password)) {
          return done(null, false, { message: 'Incorrect password' })
        }
        return done(null, userMatch)
      })
    }
  )
)

// Exporting our configured passport
module.exports = passport;