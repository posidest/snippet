'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    blogId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  BlogPost.associate = function(models) {
    // associations can be defined here
  };
  return BlogPost;
};