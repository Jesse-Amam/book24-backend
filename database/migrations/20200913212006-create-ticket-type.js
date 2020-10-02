'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TicketTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_by: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      // Timestamps
      createdAt: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
        allowNull: false
      }
    }).then(() => {
      // queryInterface.addIndex("TicketTypes", ["name"], {
      //   unique: true
      // });
    });
      },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TicketTypes');
  }
};