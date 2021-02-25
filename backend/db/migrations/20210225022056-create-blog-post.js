'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      blogId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Blogs' }
      },
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Posts' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BlogPosts');
  }
};