'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    type: DataTypes.ENUM('image', 'words', 'link'),
    content: DataTypes.TEXT,
    caption: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};