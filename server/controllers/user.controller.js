const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = require("../config/jwt.config");

module.exports = {
    findAllUsers: (req, res) => {
        User.find({})
            .then(user => res.json(user))
            .catch(err => res.json(err));
    },
    register: (req, res) => {
        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.SECRET_KEY);

                res
                    .cookie("usertoken", userToken, secret, {
                        httpOnly: true
                    })
                    .json({ msg: "success!", user: user})
            })
            .catch(err => res.status(400).json(err));
    },
    login: async (req, res) => {
        const user = await User.findOne({ email: req.body.email });

        if (user === null || !req.body.password) {
            return res.sendStatus(400);
        }

        const correctPassword = await bcrypt.compare(req.body.password, user.password);

        if (!correctPassword) {
            return res.sendStatus(400);
        }

        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);

        res
            .cookie("usertoken", userToken, secret, {
                httpOnly: true
            })
            .json({ msg: "success!", user: user })
    },
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }
}

