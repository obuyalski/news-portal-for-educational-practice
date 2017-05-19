const passport = require('../../auth');
const userModel = require('./userModel');

module.exports.login = (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (user) {
      saveSession(req.session, user);
      return res.status(200).send({ err, user });
    }
  })(req, res);
};

module.exports.logout = (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
    });
    res.send(200);
  }
};


function saveSession(session, user) {
  session.user = user;
  session.save();
}
