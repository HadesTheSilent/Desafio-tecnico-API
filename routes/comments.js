// routes/comments.js
const express = require('express');
const router = express.Router({ mergeParams: true });
const db = require('../models');

const STATUS_CODES = {
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    CREATED: 201,
    OK: 200
};

const ERROR_MESSAGES = {
    POST_NOT_FOUND: 'Post not found',
    COMMENT_NOT_FOUND: 'Comment not found',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    DELETE_ERROR: 'An error occurred while deleting the comment'
};

// Middleware to check if a post exists
async function checkPostExists(req, res, next) {
    const { postId } = req.params;
    const post = await db.Post.findByPk(postId);
    if (!post) {
        return res.status(STATUS_CODES.NOT_FOUND).json({ message: ERROR_MESSAGES.POST_NOT_FOUND });
    }
    next();
}

// Middleware for error handling
function errorHandler(error, req, res, next) {
    console.error(error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
}

router.post('/', checkPostExists, async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { text } = req.body;
        const comment = await db.Comment.create({ text, PostId: postId });
        res.status(STATUS_CODES.CREATED).json(comment);
    } catch (error) {
        next(error);
    }
}, errorHandler);

router.get('/', checkPostExists, async (req, res, next) => {
    try {
        const { postId } = req.params;
        const comments = await db.Comment.findAll({ where: { PostId: postId } });
        res.status(STATUS_CODES.OK).json(comments);
    } catch (error) {
        next(error);
    }
}, errorHandler);

router.delete('/:commentId', checkPostExists, async (req, res, next) => {
    try {
        const { postId, commentId } = req.params;
        const comment = await db.Comment.findOne({
            where: {
                id: commentId,
                PostId: postId
            }
        });
        if (!comment) {
            return res.status(STATUS_CODES.NOT_FOUND).json({ error: ERROR_MESSAGES.COMMENT_NOT_FOUND });
        }
        await comment.destroy();
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        next(error);
    }
}, errorHandler);

module.exports = router;