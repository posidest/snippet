'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    userId: DataTypes.INTEGER,
    blogId: DataTypes.INTEGER
  }, {});
  Follow.associate = function (models) {
    Follow.belongsTo(models.User, { foreignKey: 'userId' })
    Follow.belongsTo(models.Blog, { foreignKey: 'blogId' })
  };
  return Follow;
};