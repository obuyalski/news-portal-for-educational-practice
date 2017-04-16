const db = require('diskdb');

let UserModel = {

    init: function () {
        db.connect('database/', ['users']);
    },

    getUser: function (user) {
        return db.users.findOne({username: user.username, password: user.password});
    },

    getUserByName: function (username) {
        return db.users.findOne({username: username});
    }
};


module.exports = UserModel;

