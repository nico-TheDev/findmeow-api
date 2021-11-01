const { model, Schema } = require("mongoose");

const PostSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        breed: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        lostWhen: {
            type: Date,
        },
        lastSeen: {
            type: String,
        },
    },
    { timestamps: true }
);

const Post = model("Post", PostSchema);

module.exports = Post;
