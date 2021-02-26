'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    type: DataTypes.ENUM('text', 'link', 'image'),
    content: DataTypes.TEXT,
    caption: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  Post.associate = function (models) {
    Post.belongsTo(models.User, { foreignKey: 'userId' })

    const columnMappingBlogPosts = {
      through: 'BlogPosts',
      otherKey: 'blogId',
      foreignKey: 'postId'
    };
    Post.belongsToMany(models.Blog, columnMappingBlogPosts);

    const columnMappingLikes = {
      through: 'Likes',
      otherKey: 'userId',
      foreignKey: 'postId'
    };
    Post.belongsToMany(models.User, columnMappingLikes);

    // Post.hasMany(models.Like, { foreignKey: 'postId' })

  };
  return Post;
};