// delete.js
const express = require('express');
const router = express.Router();
const db = require('../models');

const STATUS_CODES = {
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    OK: 200
};

const ERROR_MESSAGES = {
    POST_NOT_FOUND: 'Post not found',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    DELETE_SUCCESS: 'Post deleted'
};

// Middleware for error handling
function errorHandler(error, req, res, next) {
    console.error(error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
}

// Route to delete a post
router.delete('/:postId', async (req, res, next) => {
    try {
        const { postId } = req.params;
        const post = await db.Post.findByPk(postId);
        if (!post) {
            return res.status(STATUS_CODES.NOT_FOUND).json({ message: ERROR_MESSAGES.POST_NOT_FOUND });
        }
        await db.Post.destroy({ where: { id: postId } });
        res.status(STATUS_CODES.OK).json({ message: ERROR_MESSAGES.DELETE_SUCCESS });
    } catch (error) {
        next(error);
    }
}, errorHandler);

module.exports = router;