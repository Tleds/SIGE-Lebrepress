import React,{useState} from 'react';

import api from '../../services/api';

import { Container, Title, Label, Input, Button, Text, Link, Select } from './styles';

function SignUp(props) {

  const [CNPJ, setCNPJ] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const handleSubmit = async ()=>{
    try {
      if(
        CNPJ === '' || 
        name === '' || 
        email === '' || 
        password === '' || 
        confirmPassword === ''
        ){
        alert('Erro: Todos os campos com asterisco (*) são obrigatórios');
        return;
      }
      if(password !== confirmPassword){
        alert('A senha e a confirmação de senha tem que ser iguais');
        return;
      }
      if(
        zipCode === '' || 
        street === '' || 
        number === '' || 
        complement === '' || 
        neighborhood === '' ||
        city === '' ||
        state === '' 
        ){
        alert('Erro: Todos os campos com asterisco (*) são obrigatórios');
        return;
      }

      const response = await api.post('/users',{
        cnpj: CNPJ,
        name: name,
        email: email,
        password: password,
        address:{
          zip_code: zipCode,
          street: street,
          number: number,
          complement: complement,
          neighborhood: neighborhood,
          city: city,
          state: state,
        }
      },{
        validateStatus:false,
      });

      if(response.status === 200){
        localStorage.setItem('token',response.data.token);
        props.history.push('/user_area');
      }

      if(response.status === 400){
        alert(response.data.message);
      }

      if(response.status === 500){
        alert(response.data.message);
      }

    } catch (e) {
      alert('Erro interno no servidor, por favor, tente mais tarde')
    }
  }
  return (
    <Container>
      <Title>Lebrepress - Cadastro de clientes</Title>
      <Title>Dados do usuário</Title>
      <Label>CNPJ*</Label>
      <Input 
        placeholder="CNPJ"
        type="text"
        onChange={(e)=>{setCNPJ(e.target.value)}}
      />
      <Label>Nome*</Label>
      <Input 
        placeholder="Nome"
        type="text"
        onChange={(e)=>{setName(e.target.value)}}
      />
      <Label>E-mail*</Label>
      <Input 
        placeholder="E-mail"
        type="email"
        onChange={(e)=>{setEmail(e.target.value)}}
      />
      <Label>Senha*</Label>
      <Input 
        placeholder="Senha"
        type="password"
        onChange={(e)=>{setPassword(e.target.value)}}
      />
      <Label>Confirme sua senha*</Label>
      <Input 
        placeholder="Confirme sua senha"
        type="password"
        onChange={(e)=>{setConfirmPassword(e.target.value)}}
      />
      <Title>Endereço</Title>
      <Label>CEP*</Label>
      <Input 
        placeholder="CEP"
        type="text"
        onChange={(e)=>{setZipCode(e.target.value)}}
      />
      <Label>Rua*</Label>
      <Input 
        placeholder="Rua"
        type="text"
        onChange={(e)=>{setStreet(e.target.value)}}
      />
      <Label>Número*</Label>
      <Input 
        placeholder="Número"
        type="number"
        onChange={(e)=>{setNumber(e.target.value)}}
      />
      <Label>Complemento*</Label>
      <Input 
        placeholder="Complemento"
        type="text"
        onChange={(e)=>{setComplement(e.target.value)}}
      />
      <Label>Bairro*</Label>
      <Input 
        placeholder="Bairro"
        type="text"
        onChange={(e)=>{setNeighborhood(e.target.value)}}
      />
      <Label>Cidade*</Label>
      <Input 
        placeholder="Cidade"
        type="text"
        onChange={(e)=>{setCity(e.target.value)}}
      />
      <Label>Estado*</Label>
        <Select 
          onChange={(e)=> setState(e.target.value)}
          required
        >
          <option>Selecione um estado...</option>
          <option>AC</option>
          <option>AL</option>
          <option>AP</option>
          <option>AM</option>
          <option>BA</option>
          <option>CE</option>
          <option>DF</option>
          <option>ES</option>
          <option>GO</option>
          <option>MA</option>
          <option>MT</option>
          <option>MS</option>
          <option>MG</option>
          <option>PA</option>
          <option>PB</option>
          <option>PR</option>
          <option>PE</option>
          <option>PI</option>
          <option>RR</option>
          <option>RO</option>
          <option>RJ</option>
          <option>RN</option>
          <option>RS</option>
          <option>SC</option>
          <option>SP</option>
          <option>SE</option>
          <option>TO</option>
        </Select>
      
      <Button
        onClick={handleSubmit}
      >Cadastrar</Button>
      <Text>
        Já possui uma conta? 
        <Link
          href="/"
        >
        Clique aqui
        </Link>
      </Text>
    </Container>
  );
}

export default SignUp;