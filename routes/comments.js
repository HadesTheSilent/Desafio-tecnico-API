// routes/comments.js
const express = require('express');
const router = express.Router({ mergeParams: true }); // This allows the router to access params from the parent router
const db = require('../models');
const Comment = require('../models/Comment')

// Route to create a new comment for a specific post
router.post('/', async (req, res) => {
    try {
        const { postId } = req.params; // Get the post id from the parent route
        const { text } = req.body; // Get the comment text from the request body

        // Check if the post exists
        const post = await db.Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Create a new comment for the post
        const comment = await db.Comment.create({ text, PostId: postId });

        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        console.log(`postId: ${postId}`);
        const post = await db.Post.findByPk(postId);
        console.log('post:', post);

    }
});
router.get('/', async (req, res) => {
    try {
        const { postId } = req.params; // Get the post id from the parent route

        // Check if the post exists
        const post = await db.Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Get comments for the post
        const comments = await db.Comment.findAll({ where: { PostId: postId } });

        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:commentId', async (req, res) => {
    try {
        const { postId, commentId } = req.params;

        const comment = await db.Comment.findOne({
            where: {
                id: commentId,
                PostId: postId
            }
        });

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        await comment.destroy();

        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the comment' });
    }
});
module.exports = router;