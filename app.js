require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

const app = express();
app.use(bodyParser.json());

// Routes
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');

app.use('/posts', postsRoutes);
app.use('/posts/:postId/comments', commentsRoutes);

// Server initialization
const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor aberto na porta ${PORT}`);
    });
});