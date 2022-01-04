const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const handleErrors = require("../util/handleErrors");
const { upload } = require("../middleware/Upload");

const expiration = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, "findmeow", { expiresIn: expiration });
};

module.exports.signup_post = async (req, res) => {
    const data = req.body;
    console.log(req.body);
    console.log(req.file);
    try {
        const user = await User.create({
            email: data.email,
            password: data.password,
            name: data.name,
            username: data.username,
            location: data.location,
            contact: data.contact,
            profileImg: req.file.filename,
        });

        const token = createToken(user._id);
        res.cookie("jwt", token, {
            domain: process.env.DOMAIN,
            maxAge: expiration * 1000,
        });

        res.status(201).json({
            userID: user._id,
            token,
            user: {
                name: user.name,
                username: user.username,
                profileImg: user.image,
                email: user.email,
                location: user.location,
                contact: user.contact,
                profileImg: user.profileImg,
            },
        });
    } catch (err) {
        handleErrors(err);
        res.status(404).json(err);
    }
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body.data;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            domain: "http://localhost:3000",
            maxAge: expiration * 1000,
        });
        res.status(201).json({ userID: user._id, token, user });
    } catch (err) {
        handleErrors(err);
        res.status(404).json(err);
    }
};

module.exports.user_get = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                name: user.name,
                contact: user.contact,
                location: user.location,
                image: user.image,
            },
        });
    } catch (err) {
        handleErrors(err);
        res.status(404).json(err);
    }
};

module.exports.user_delete = async (req, res) => {
    // CHECK IF THE USER IS DELETING THEIR OWN ACCOUNT

    if (req.body.data.id === req.params.id) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account Deleted Successfully");
        } catch (err) {
            handleErrors(err);
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can only delete your own account");
    }
};

module.exports.user_put = async (req, res) => {
    // CHECK IF THE USER IS EDITING THEIR OWN ACCOUNT

    if (req.body.data.id === req.params.id) {
        if (req.body.data.password) {
            const salt = await bcrypt.genSalt();
            req.body.data.password = await bcrypt.hash(
                req.body.data.password,
                salt
            );
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body.data,
            });
            res.status(200).json("Account Updated Successfully");
        } catch (err) {
            handleErrors(err);
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can only edit your own account");
    }
};
