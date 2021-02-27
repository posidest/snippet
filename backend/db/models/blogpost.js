'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    blogId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  BlogPost.associate = function (models) {
    BlogPost.belongsTo(models.Blog, { foreignkey: 'blogId' });
    BlogPost.belongsTo(models.Post, { foreignKey: 'postId' })
  };
  return BlogPost;
};