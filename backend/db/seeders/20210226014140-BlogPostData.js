'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('BlogPosts', [
      { blogId: 13, postId: 8, createdAt: new Date(), updatedAt: new Date() },
      { blogId: 13, postId: 9, createdAt: new Date(), updatedAt: new Date() },
      { blogId: 13, postId: 10, createdAt: new Date(), updatedAt: new Date() },
      { blogId: 13, postId: 12, createdAt: new Date(), updatedAt: new Date() },
      { blogId: 13, postId: 13, createdAt: new Date(), updatedAt: new Date() },
      { blogId: 11, postId: 16, createdAt: new Date(), updatedAt: new Date() },
      { blogId: 11, postId: 18, createdAt: new Date(), updatedAt: new Date() },
      { blogId: 11, postId: 19, createdAt: new Date(), updatedAt: new Date() },
      { blogId: 11, postId: 20, createdAt: new Date(), updatedAt: new Date() },
      { blogId: 6, postId: 21, createdAt: new Date(), updatedAt: new Date() },
      { blogId: 6, postId: 22, createdAt: new Date(), updatedAt: new Date() },
      { blogId: 6, postId: 23, createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BlogPosts', {}, null)
  }
};
