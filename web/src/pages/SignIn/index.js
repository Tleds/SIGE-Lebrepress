import React, {useState} from 'react';

import api from '../../services/api';

import { 
  Container,
  Label,
  Input,
  Button,
  Title,
  Text,
  Link,
} from './styles';

function SignIn(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async ()=>{
    try {
      if(email === '' || password === ''){
        alert('Erro: O e-mail e a senha não podem ser nulos');
        return;
      }
      const response = await api.post('/session_user',{
        email: email,
        password: password,
      },{
        validateStatus: false,
      });

      if(response.status === 200){
        localStorage.setItem('token',response.data.token);
        props.history.push('/user_area');
      }

      if(response.status === 400){
        alert(response.data.message)
      }

    } catch (e) {
     alert('Erro interno no servidor, por favor, tente mais tarde') ;
    }    
  }

  return (
    <Container>
      <Title>LebrePress - Entrar</Title>
      <Label>E-mail</Label>
      <Input 
        type="email" 
        placeholder="E-mail"
        onChange={(e)=>{setEmail(e.target.value)}}
      />
      <Label>Senha</Label>
      <Input 
        type="password" 
        placeholder="Senha"
        onChange={(e)=>{setPassword(e.target.value)}}
      />
      <Button
        onClick={handleSubmit}
      >
        Entrar
      </Button>
      <Text>
        Ainda não tem uma conta? 
        <Link href="/sign_up">
        Clique aqui
        </Link>
      </Text>
    </Container>
  );
}

export default SignIn;