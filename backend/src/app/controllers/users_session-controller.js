
const User = require('../models/database/models/Users');

class UsersSession {
  async session(req,res){
    try {
      const { email, password } = req.body;

      const userExist = await User.findOne({
        attributes: ['id', 'password_hash'],
        where: { email },
      });

      if (!userExist) {
        return res.status(400).json({ message: 'Usuário não encontrado' });
      }

      if (!(await userExist.checkPassword(password))) {
        return res.status(401).json({ message: 'Senha inválida' });
      }

      return res.json({
        message: 'Usuário autenticado',
        token: userExist.generateToken(),
      });
    } catch (e) {
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  }
}

module.exports = new UsersSession();