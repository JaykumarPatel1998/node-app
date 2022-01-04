const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {createJwtToken} = require('../authorization');

exports.signup = (req, res, next) => {
    User.find({email: req.body.email}).exec().then
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            res.status(500).json({error: err});
        }
        else {
            const user = new User({
                _id : new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });
            user.save()
            .then(() => {
                res.status(201).json({
                    message: 'user registered successfully'
                })
            })
            .catch(error => {
                res.status(500).json({error: error});
            })
        }
    })
}

exports.loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email}).exec();
        if (user) {
            bcrypt.compare(req.body.password, user.password).then(result => {
                if (result) {
                    const token = createJwtToken(user);
                    res.status(200).json({message : 'Auth Successfull', token: token})
                } else {
                    res.status(401).json({message: 'Authentication Failed!'})
                }
            })
        } else {
            res.status(401).json({message: 'Authentication Failed!'})
        }
    } catch (error) {
        res.status(401).json({message: 'Authentication Failed!'})
    }
}

exports.deleteuser = async (req, res, next) => {
    try {
        const id = req.params.userId;
        const response = await User.deleteOne({_id: id}).exec()
        res.status(200).json({
            message: `Deleted User!`,
            response: response
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error})
    }
}