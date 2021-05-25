'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');



module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        blogName: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        avatar: 'https://snippetbucket.s3.amazonaws.com/b18.jpg',
      },
      {
        email: faker.internet.email(),
        blogName: faker.internet.userName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password())
      },
      {
        email: faker.internet.email(),
        blogName: faker.internet.userName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password())
      },
      {
        email: faker.internet.email(),
        blogName: faker.internet.userName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password())
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      id: { [Op.gt]: 0 }
    }, {});
  }
};
