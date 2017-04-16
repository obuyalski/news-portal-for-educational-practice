const userModel = require('./userModel');

let UserService = {
    addUser: function (user) {

        return userModel.getUser(user);
    }
};

module.exports = UserService;