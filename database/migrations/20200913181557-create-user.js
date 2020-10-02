'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      full_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      id_url: {
        type: Sequelize.STRING
      },
      hotel_id: {
        type: Sequelize.INTEGER
      },
      photo_url: {
        type: Sequelize.STRING
      },
      mobile_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      device_token: {
        type: Sequelize.STRING
      },
      device_type: {
        type: Sequelize.STRING
      },
      device_language: {
        type: Sequelize.STRING
      },
      role: {
        type:   Sequelize.ENUM,
        values: ['guest','hotel-admin','admin','super-admin'],
        defaultValue: 'guest'
      },
      verified: {
        type:   Sequelize.BOOLEAN,
        defaultValue: false
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      verification_url: {
        type: Sequelize.STRING
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
    },   {
      engine: 'InnoDB',
      charset: 'utf8mb4',
  }).then(() => {
      queryInterface.addIndex("Users", ["email", "mobile_number", "username"], {
        unique: true
      });
});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};