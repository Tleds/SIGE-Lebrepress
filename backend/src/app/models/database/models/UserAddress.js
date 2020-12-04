const { DataTypes, Model } = require('sequelize');

class UserAddress extends Model {
  static init(sequelize) {
    super.init(
      {
        zip_code: DataTypes.STRING(8),
        street: DataTypes.STRING(100),
        number: DataTypes.STRING(8),
        complement: DataTypes.STRING(100),
        neighborhood: DataTypes.STRING(100),
        city: DataTypes.STRING(100),
        state: DataTypes.STRING(2),
      },
      {
        sequelize,
        tableName: 'user_address',
      }
    );
  }
  static associate(models){
    this.belongsTo(models.Users,{
      foreignKey: 'id_user',
      as:'users',
      onDelete:'CASCADE',
      onUpdate:'CASCADE',
      hooks: true,
    })
  }
}

module.exports = UserAddress;
