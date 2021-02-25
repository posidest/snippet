'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [
      {
        type: 'image', content: 10250222 - 10205004712828437 - 923155374015269185 - n_orig.jpg


      }
    ])

    down: (queryInterface, Sequelize) => {
      /*
        Add reverting commands here.
        Return a promise to correctly handle asynchronicity.
  
        Example:
        return queryInterface.bulkDelete('People', null, {});
      */
    }
  };
