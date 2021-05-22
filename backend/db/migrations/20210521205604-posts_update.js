'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Posts',
      'ownerId',
     {
      type: Sequelize.INTEGER,
      references: { model: 'Users' },
     }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Posts',
      'ownerId',
    );
  }
};
