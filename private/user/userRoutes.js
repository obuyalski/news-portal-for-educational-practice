const userModel = require('./userModel');

module.exports.getUser = (req, res) => {
    userModel.getUser(req.body.user)
        .then(addedUser => res.json(addedUser))
        .catch(error => {
                res.status(error);
                res.send('User not added');
            }
        );
};