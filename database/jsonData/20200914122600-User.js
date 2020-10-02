'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkInsert('Users', [{
        full_name: 'John Doe',
        email: 'gorgeceo@gmail.com',
        password: 'password',
        school_id: 1,
        mobile_number: '08169212041',
        username: 'adokz',
        role: 'super-admin',
        verified: true
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('Users', null, {});
     
  }
};
