// routes/posts.js
const express = require('express');
const router = express.Router();
const db = require('../models');
const commentsRoutes = require('./comments');
router.use('/:postId/comments', commentsRoutes);

// Rota para criar um novo post
router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await db.Post.create({ title, content });
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Rota para obter todos os posts
router.get('/', async (req, res) => {
    try {
        const posts = await db.Post.findAll();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Rota para obter um post específico
router.get('/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await db.Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Rota para atualizar um post
router.put('/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, content } = req.body;
        const post = await db.Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.title = title;
        post.content = content;
        await post.save();
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Rota para excluir um post
router.delete('/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await db.Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        await post.destroy();
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
