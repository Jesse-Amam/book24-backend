'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HotelBookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      additonal_info: {
        type: Sequelize.STRING,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      room_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_by: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      check_in_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      check_out_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      
      paid: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      payment_reference: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL(10,2),
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('HotelBookings');
  }
};