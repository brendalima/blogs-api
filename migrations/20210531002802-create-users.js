'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Users = await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      displayName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: 'unique_tag'
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      }
    },
    { // Reference lines below: https://stackoverflow.com/questions/42195348/
      // tip from @vanessanaara
      uniqueKeys: {
        unique_tag: {
          customIndex: true,
          fields: ['email']
        }
      }
    });
    return Users;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
