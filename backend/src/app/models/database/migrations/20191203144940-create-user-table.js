'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('users', {
       id:{
         type: Sequelize.UUID,
         allowNull:false,
         primaryKey: true,
         defaultValue: Sequelize.fn('uuid_generate_v4'),
       },
       cnpj:{
         type: Sequelize.STRING(14),
         allowNull: false,
         unique: true,
       },
       name:{
         type: Sequelize.STRING(100),
         allowNull:false,
       },
       email:{
         type: Sequelize.STRING(100),
         allowNull:false,
         unique: true,
       },
       password_hash:{
         type: Sequelize.STRING(100),
         allowNull:false,
       },
       created_at:{
         type: Sequelize.DATE,
         allowNull:false,
         defaultValue: Sequelize.fn('Now'),
       },
       updated_at:{
         type: Sequelize.DATE,
         allowNull:false,
         defaultValue: Sequelize.fn('Now'),
       }
      });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('users');
  }
};
