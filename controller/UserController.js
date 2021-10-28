const User = require("../models/User");
const jwt = require("jsonwebtoken");
const handleErrors = require("../util/handleErrors");

const expiration = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, "findmeow", { expiresIn: expiration });
};

module.exports.signup_post = async (req, res) => {
    const { data } = req.body;
    try {
        const user = await User.create({
            email: data.email,
            password: data.password,
            name: data.name,
            username: data.username,
            location: data.location,
            contact: data.contact,
        });

        const token = createToken(user._id);
        res.cookie("jwt", token, {
            domain: "http://localhost:3000",
            maxAge: expiration * 1000,
        });

        res.status(201).json({ user: user._id, token });
    } catch (err) {
        handleErrors(err);
        res.status(404).json(err);
    }
};
