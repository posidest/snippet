'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Likes', [
      { userId: 5, postId: 1, createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, postId: 21, createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, postId: 23, createdAt: new Date(), updatedAt: new Date() },
      { userId: 20, postId: 3, createdAt: new Date(), updatedAt: new Date() },
      { userId: 20, postId: 22, createdAt: new Date(), updatedAt: new Date() },
      { userId: 20, postId: 18, createdAt: new Date(), updatedAt: new Date() },
      { userId: 12, postId: 1, createdAt: new Date(), updatedAt: new Date() },
      { userId: 12, postId: 23, createdAt: new Date(), updatedAt: new Date() },
      { userId: 18, postId: 3, createdAt: new Date(), updatedAt: new Date() },
      { userId: 18, postId: 18, createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Likes', null, {})
  }
};
