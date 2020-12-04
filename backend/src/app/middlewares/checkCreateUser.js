const yup = require('yup');

module.exports = async function checkCreateUser(req, res, next) {
  try {
    const schema = yup.object().shape({
      cnpj: yup.string('O CNPJ precisa ser uma string')
        .min(14, 'O CNPJ precisa ter no mínimo 14 caracteres')
        .max(14, 'O CNPJ precisa ter no máximo 14 caracteres')
        .required('O CNPJ não pode ser vazio'),
      name: yup
        .string('O nome precisa ser string')
        .min(3, 'O nome precisa ter no mínimo 3 caracteres')
        .max(100, 'O nome não pode ter mais de 100 caracteres')
        .required('O nome não pode ser nulo'),
      email: yup
        .string('O email precisa ser string')
        .email('E-mail inválido')
        .min(8, 'O email precisa ter no mínimo 8 caracteres')
        .max(100, 'O email não pode ter mais de 100 caracteres')
        .required('O e-mail não pode ser nulo'),
      password: yup
        .string('A senha precisa ser string')
        .min(8, 'A senha precisa ter no mínimo 8 caracteres')
        .max(16, 'A senha não pode ter mais de 16 caracteres')
        .required('A senha não pode ser nula'),
      address: yup.object().shape({
        zip_code: yup
          .string('O CEP precisa ser uma string')
          .min(8, 'O CEP precisa ter no mínimo 8 caracteres')
          .max(8, 'O CEP pode ter no máximo 8 caracteres')
          .required('A CEP não pode ser vazia'),
        street: yup
          .string('A rua precisa ser uma string')
          .max(100, 'A rua pode ter no máximo 100 caracteres')
          .required('A rua não pode ser vazia'),
        number: yup
          .number()
          .integer('A número precisa ser um inteiro')
          .required('O número não pode ser vazio'),
        complement: yup
          .string('O complemento precisa ser uma string')
          .max(100, 'O complemento pode ter no máximo 100 caracteres'),
        neighborhood: yup
          .string('O bairro precisa ser uma string')
          .max(100, 'O bairro pode ter no máximo 100 caracteres')
          .required('O bairro não pode ser vazio'),
        city: yup
          .string('A cidade precisa ser uma string')
          .max(100, 'A cidade pode ter no máximo 100 caracteres')
          .required('A cidade não pode ser vazia'),
        state: yup
          .string('O estado precisa ser uma string')
          .min(2, 'O estado precisa ter no mínimo 2 caracteres')
          .max(2, 'O estado pode ter no máximo 2 caracteres')
          .required('O estado não pode ser vazio'),
      })
      
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ message: err.inner[0].errors[0] });
  }
};
