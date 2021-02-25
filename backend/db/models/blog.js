'use strict';
module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    userId: DataTypes.INTEGER,
    avatar: DataTypes.STRING
  }, {});
  Blog.associate = function (models) {
    Blog.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Blog;
};