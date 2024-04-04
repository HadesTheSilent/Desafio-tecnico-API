module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    Comment.associate = function (models) {
        Comment.belongsTo(models.Post, {
            foreignKey: 'PostId',
            as: 'post'
        }); // A comment belongs to a post
    }

    return Comment;
};