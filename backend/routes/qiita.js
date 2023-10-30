const router = require("express").Router();
const PostsQiita = require("../models/PostsQiita");

// Get All Post
router.get("/", async (req, res) => {
    try {
        const allPosts = await PostsQiita.find();
        return res.status(200).json(allPosts);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get Posts latest & top 5


// Export
module.exports = router;
