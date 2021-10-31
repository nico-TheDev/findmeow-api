const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            min: 5,
            max: 20,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            min: 2,
            max: 100,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            min: 5,
            max: 50,
            required: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        location: {
            type: String,
            required: true,
            min: 5,
        },
        contact: {
            type: String,
            required: true,
            min: 5,
        },
        image: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.statics.login = async (email, password) => {
    const user = await User.findOne({ email }).exec();

    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) return user;
        throw new Error("Incorrect Password");
    }

    throw new Error("Create an Account");
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
