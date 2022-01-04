const express = require("express");
const router = express.Router();
const User = require('../models/user');
const UserController = require('../controller/userController');
const {AuthenticateUser}  = require('../authorization');

router.post('/signup', doesEmailExistInDatabase, UserController.signup)

router.post('/login', UserController.loginUser)

router.delete('/:userId',AuthenticateUser, UserController.deleteuser)

function doesEmailExistInDatabase(req, res, next) {
        User.findOne({email: req.body.email}).exec()
        .then(user => {
            if(user) {
                return res.status(409).json({
                    message: 'Email already in use!'
                })
            }
            else{
                return next();
            }
        })
        .catch(error => {
            res.status(500).json({error: error});
        })
}

module.exports = router;