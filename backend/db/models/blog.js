'use strict';
module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    userId: DataTypes.INTEGER,
    avatar: DataTypes.STRING
  }, {});
  Blog.associate = function (models) {
    Blog.belongsTo(models.User, { foreignKey: 'userId' })

    const columnMappingBlogPosts = {
      through: 'BlogPosts',
      foreignKey: 'blogId',
      otherKey: 'postId'
    };
    Blog.belongsToMany(models.Post, columnMappingBlogPosts)

    const columnMappingFollows = {
      through: 'Follows',
      foreignKey: 'blogId',
      otherKey: 'userId'
    };
    Blog.belongsToMany(models.User, columnMappingFollows)

  };
  return Blog;
};