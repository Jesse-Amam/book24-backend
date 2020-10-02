'use strict';
var faculties = require('./faculties.json');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let new_faculties = [];
    for(let i=0;i<faculties.length;i++){
      new_faculties.push({
        name: faculties[i]
      })
    }
    console.log(new_faculties)

   await queryInterface.bulkInsert('Faculties', new_faculties, {});
  },

  down: async (queryInterface, Sequelize) => {
    
   await queryInterface.bulkDelete('Faculties', null, {});
    
  }
};
