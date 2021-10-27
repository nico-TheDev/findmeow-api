const User = require("../models/User");

const handleErrors = require("../util/handleErrors");

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

        res.status(200).json(user);
    } catch (err) {
        handleErrors(err);
        res.status(404).json(err);
    }
};
