const db = require('diskdb');

let UserModel = {

    init: function () {
        db.connect('database/', ['users']);
    },

    getUser: function (user) {
        return new Promise (function (resolve, reject) {
        let userDb = db.users.findOne({username: user.username, password: user.password});
        if (userDb){
            resolve(userDb);
            return;
        }
        reject(404)});
    }
};


module.exports = UserModel;

