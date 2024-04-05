// routes/posts.js
const express = require('express');
const router = express.Router();
const db = require('../models');
const commentsRoutes = require('./comments');

router.use('/:postId/comments', commentsRoutes);

const STATUS_CODES = {
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    CREATED: 201,
    OK: 200,
    NO_CONTENT: 204
};

const ERROR_MESSAGES = {
    POST_NOT_FOUND: 'Post not found',
    INTERNAL_SERVER_ERROR: 'Internal server error'
};

// Middleware to check if a post exists
async function checkPostExists(req, res, next) {
    const { postId } = req.params;
    const post = await db.Post.findByPk(postId);
    if (!post) {
        return res.status(STATUS_CODES.NOT_FOUND).json({ message: ERROR_MESSAGES.POST_NOT_FOUND });
    }
    req.post = post;
    next();
}

// Middleware for error handling
function errorHandler(error, req, res, next) {
    console.error(error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
}

router.post('/', async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const post = await db.Post.create({ title, content });
        res.status(STATUS_CODES.CREATED).json(post);
    } catch (error) {
        next(error);
    }
}, errorHandler);

router.get('/', async (req, res, next) => {
    try {
        const posts = await db.Post.findAll();
        res.status(STATUS_CODES.OK).json(posts);
    } catch (error) {
        next(error);
    }
}, errorHandler);

router.get('/:postId', checkPostExists, (req, res) => {
    res.status(STATUS_CODES.OK).json(req.post);
}, errorHandler);

router.put('/:postId', checkPostExists, async (req, res, next) => {
    try {
        const { title, content } = req.body;
        req.post.title = title;
        req.post.content = content;
        await req.post.save();
        res.status(STATUS_CODES.OK).json(req.post);
    } catch (error) {
        next(error);
    }
}, errorHandler);

router.delete('/:postId', checkPostExists, async (req, res, next) => {
    try {
        await req.post.destroy();
        res.status(STATUS_CODES.NO_CONTENT).end();
    } catch (error) {
        next(error);
    }
}, errorHandler);

module.exports = router;