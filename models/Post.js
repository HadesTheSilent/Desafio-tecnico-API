// models/Post.js
module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('Post', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    });

    return Post;
};

