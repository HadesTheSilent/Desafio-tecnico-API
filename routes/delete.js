// Route to delete a post
router.delete('/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await db.Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        await db.Post.destroy({ where: { id: postId } });
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});