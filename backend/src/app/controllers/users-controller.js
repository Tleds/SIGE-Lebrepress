const User = require('../models/database/models/Users');
const UserAddress = require('../models/database/models/UserAddress');

class UsersController {
  async show(req,res){
    try{
      const response = await User.findByPk(req.userId,{
        attributes:['id','cnpj','name','api_key'],
        include:[{
          model: UserAddress,
          as:'address',
          attributes:['id','zip_code','street','number','complement','neighborhood','city','state']
        }]
      });

      res.status(200).json(response);
    } catch(e){
      console.log(e);
      res.status(500).json({
        message:'Erro interno no servidor, por favor, tente mais tarde'
      });
    }
  }
  async create(req,res){
    try {
      const {
        cnpj,
        name,
        email,
        password,
        address
      } = req.body;

      const emailExist = await User.findOne({
        where: {email},
      });

      if(emailExist){
        return res.status(400).json({
          message:'Erro: E-mail já cadastrado'
        })
      }

      const cnpjExist = await User.findOne({
        where: {cnpj},
      });

      if(cnpjExist){
        return res.status(400).json({
          message:'Erro: CNPJ já cadastrado'
        })
      }

      const response = await User.create({
        cnpj,
        name,
        email,
        password,
      });
      
      const {
        zip_code,
        street,
        number,
        complement,
        neighborhood,
        city,
        state
      } = address

      const responseAddress = await UserAddress.create({
        id_user: response.id,
        zip_code,
        street,
        number,
        complement,
        neighborhood,
        city,
        state
      });

      res.status(200).json({
        message: 'Usuário criado com sucesso',
        token: response.generateToken(),
        user: {
          name: response.name,
          email: response.email,
        },
        endereço: {
          zip_code: responseAddress.zip_code,
          street: responseAddress.street,
          number: responseAddress.number,
          complement: responseAddress.complement,
          neighborhood: responseAddress.neighborhood,
          city: responseAddress.city,
          state: responseAddress.state
        },
      });


    } catch (e) {
      console.log(e);
      res.status(500).json({
        message:'Erro interno no servidor, por favor, tente mais tarde'
      })
    }
  }
  async update(req,res){

  }
  async delete(req,res){
    try {
      const userExist = await User.findByPk(req.userId, { raw: true});

      if(!userExist){
        return res.status(400).json({
          message:'Usuário inválido'
        })
      }

      await User.destroy({
        where: { id: req.userId}
      });

      res.status(200).json({
        message:'Conta excluída'
      })

    } catch (e) {
      res.status(500).json({
        message:'Erro interno no servidor, por favor, tente mais tarde'
      })
    }
  }

}

module.exports = new UsersController();