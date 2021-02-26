'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Follows', [
      { userId: 25, blogId: 13, createdAt: new Date(), updatedAt: new Date() },
      { userId: 25, blogId: 11, createdAt: new Date(), updatedAt: new Date() },
      { userId: 25, blogId: 6, createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelte('Follows', null, {});
  }
};
