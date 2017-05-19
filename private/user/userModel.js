const db = require('diskdb');

const UserModel = {

  init() {
    db.connect('database/', ['users']);
  }

};

module.exports = UserModel;

