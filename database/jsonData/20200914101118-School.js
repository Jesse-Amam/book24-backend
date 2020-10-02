'use strict';
var schools = require('./schools.json');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let new_schools = [];
    for(let i=0;i<schools.length;i++){
      new_schools.push({
        name: schools[i]
      })
    }
    console.log(new_schools)

   await queryInterface.bulkInsert('Schools', new_schools, {});
  },

  down: async (queryInterface, Sequelize) => {
    
   await queryInterface.bulkDelete('Schools', null, {});
    
  }
};
