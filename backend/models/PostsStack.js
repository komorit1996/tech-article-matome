const mongoose = require("mongoose");

const PostsStackSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: ""
        },
        link: {
            type: String,
            require: true,
            unique: true
        },
        postDate: {
            require: true,
            type: Date
        },
        tags: {
            type: Array
        },
        likes: {
            type: Number,
            require: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("PostsStack", PostsStackSchema);
