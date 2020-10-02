'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RoomTypes', {
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
      hotel_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_by: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
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
      // queryInterface.addIndex("RoomTypes", ["name"], {
      //   unique: true
      // });
    });
      },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('RoomTypes');
  }
};