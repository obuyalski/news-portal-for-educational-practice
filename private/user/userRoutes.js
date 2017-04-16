const userService = require('./userService');

module.exports.addUser = (req, res) => {
    let addedUser = userService.addUser(req.body.user);

    res.json(addedUser);
};