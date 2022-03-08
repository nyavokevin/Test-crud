'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users',
      'age',
      {
        type: Sequelize.INTEGER,
        after: 'gender'
      }
    );
  },
  async down (queryInterface, Sequelize) {
   return queryInterface.removeColumn('users', 'age');
  }
};
