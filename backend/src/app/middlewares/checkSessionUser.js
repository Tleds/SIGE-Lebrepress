const yup = require('yup');

module.exports = async function checkUserSession(req, res, next) {
  try {
    const schema = yup.object().shape({
      email: yup
        .string()
        .email('E-mail inválido')
        .min(8, 'O email precisa ter no mínimo 8 caracteres')
        .max(100, 'O email não pode ter mais de 100 caracteres')
        .required('O e-mail não pode ser nulo'),
      password: yup
        .string()
        .min(8, 'A senha precisa ter no mínimo 8 caracteres')
        .max(16, 'A senha não pode ter mais de 16 caracteres')
        .required('A senha não pode ser nula'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ message: err.inner[0].errors[0] });
  }
};
