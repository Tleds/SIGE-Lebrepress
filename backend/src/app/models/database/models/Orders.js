const { DataTypes, Model } = require('sequelize');

class Orders extends Model {
  static init(sequelize) {
    super.init(
      {
        sales_man_code: DataTypes.STRING(30),
        cnpj_client: DataTypes.STRING(14),
        load_size: DataTypes.STRING(5),
        load_type: DataTypes.STRING(50),
        cep_origin: DataTypes.STRING(8),
        street_origin: DataTypes.STRING(100),
        number_origin: DataTypes.STRING(10),
        complement_origin: DataTypes.STRING(100),
        neighborhood_origin: DataTypes.STRING(100),
        city_origin: DataTypes.STRING(100),
        state_origin: DataTypes.STRING(2),
        cep_destiny: DataTypes.STRING(8),
        street_destiny: DataTypes.STRING(100),
        number_destiny: DataTypes.STRING(10),
        complement_destiny: DataTypes.STRING(100),
        neighborhood_destiny: DataTypes.STRING(10),
        city_destiny: DataTypes.STRING(10),
        state_destiny: DataTypes.STRING(10),
        trip_distance: DataTypes.STRING(50),
        trip_duration: DataTypes.STRING(50),
        price: DataTypes.FLOAT,
        nfe_id: DataTypes.STRING(255),
      },
      {
        sequelize,
        tableName: 'orders',
      }
    );
  }
}

module.exports = Orders;
