module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.fn('uuid_generate_v4'),
      },
      id_user:{
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
          as: 'users',
        },
       },
      sales_man_code: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      cnpj_client: {
        type: Sequelize.STRING(14),
        allowNull: false,
      },
      load_size: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      load_type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      cep_origin: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      street_origin: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      number_origin: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      complement_origin: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      neighborhood_origin: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      city_origin: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      state_origin: {
        type: Sequelize.STRING(2),
        allowNull: true,
      },
      cep_destiny: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      street_destiny: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      number_destiny: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      complement_destiny: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      neighborhood_destiny: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      city_destiny: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      state_destiny: {
        type: Sequelize.STRING(2),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('Now'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('Now'),
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders');
  },
};
