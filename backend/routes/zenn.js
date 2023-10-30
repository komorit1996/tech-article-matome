const router = require("express").Router();
const PostsZenn = require("../models/PostsZenn");

// Get All Post
router.get("/", async (req, res) => {
    try {
        const allPosts = await PostsZenn.find();
        return res.status(200).json(allPosts);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Export
module.exports = router;
