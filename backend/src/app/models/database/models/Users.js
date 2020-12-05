const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Users extends Model {
  static associate(models){
    this.hasOne(models.UserAddress,{
      foreignKey: 'id_user',
      as:'address',
      onDelete:'CASCADE',
      onUpdate:'CASCADE',
      hooks: true,
    })
  }
  static init(sequelize) {
    super.init(
      {
        cnpj: DataTypes.STRING(14),
        name: DataTypes.STRING(100),
        email: DataTypes.STRING(100),
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING(100),        
      },
      {
        sequelize,
        tableName: 'users',
      }
    );
    this.addHook('beforeSave', async (user)=>{
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
      return this;
    });
    return this;
  }
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
  generateToken() {
    return jwt.sign(
      {
        id: this.id,
      },
      process.env.SECRET,
      {
        expiresIn: '7d',
      }
    );
  }
}

module.exports = Users;
