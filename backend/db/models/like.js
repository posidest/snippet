'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  Like.associate = function (models) {
    Like.belongsTo(models.User, { foreignKey: 'userId' });
    Like.belongsTo(models.Post, { foreignKey: 'postId' })
    // associations can be defined here

  };
  return Like;
};