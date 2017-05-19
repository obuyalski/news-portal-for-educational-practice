const db = require('diskdb');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((username, done) => {
  const user = db.users.findOne({ username });
  if (!user) {
    return done(null, false);
  }
  return done(null, user);
});


passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password'
},
  (login, password, done) => {
    const user = db.users.findOne({ login });
    if (!user) {
      done(null, false);
      return;
    }
    if (user.password !== password) {
      done(null, false);
      return;
    }
    done(null, user);
  }
));

module.exports = passport;
