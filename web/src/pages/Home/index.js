import React,{useState} from 'react';

import api from '../../services/api';

import { Input, Form, Select, SubTitle, Label, Button } from './styles';

function Home(props) {
  
  const [salesmanCode, setSalesmanCode] = useState('');
  const [CNPJClient, setCNPJClient] = useState('');
  const [loadSize, setLoadSize] = useState('');
  const [loadType, setLoadType] = useState('');

  const [cepOrigin, setCepOrigin] = useState('');
  const [addressOrigin, setAddressOrigin] = useState('');
  const [numberOrigin, setNumberOrigin] = useState('');
  const [complementOrigin, setComplementOrigin] = useState('');
  const [neighborhoodOrigin, setNeighborhoodOrigin] = useState('');
  const [cityOrigin, setCityOrigin] = useState('');
  const [stateOrigin, setStateOrigin] = useState('');
  const [cepDestiny, setCepDestiny] = useState('');
  const [addressDestiny, setAddressDestiny] = useState('');
  const [numberDestiny, setNumberDestiny] = useState('');
  const [complementDestiny, setComplementDestiny] = useState('');
  const [neighborhoodDestiny, setNeighborhoodDestiny] = useState('');
  const [cityDestiny, setCityDestiny] = useState('');
  const [stateDestiny, setStateDestiny] = useState('');

  const handleSubmit = async (e) =>{
    e.preventDefault();
      console.log(salesmanCode,
        CNPJClient,
        loadSize,
        loadType,
        cepOrigin,
        addressOrigin,
        numberOrigin,
        complementOrigin,
        neighborhoodOrigin,
        cityOrigin,
        stateOrigin,
        cepDestiny,
        addressDestiny,
        numberDestiny,
        complementDestiny,
        neighborhoodOrigin,
        cityDestiny,
        stateDestiny
      );
    const response = await api.post('/orders',{
        sales_man_code: salesmanCode,
        cnpj_client: CNPJClient, 
        load_size: loadSize,
        load_type: loadType,
        cep_origin: cepOrigin,
        street_origin: addressOrigin,
        number_origin: numberOrigin,
        complement_origin: complementOrigin,
        neighborhood_origin: neighborhoodOrigin,
        city_origin: cityOrigin,
        state_origin: stateOrigin,
        cep_destiny: cepDestiny,
        street_destiny: addressDestiny,
        number_destiny: numberDestiny,
        complement_destiny: complementDestiny,
        neighborhood_destiny: neighborhoodOrigin,
        city_destiny: cityDestiny,
        state_destiny: stateDestiny
    });

    if(response.status === 200){
      props.history.push('/order_details',{
        id_order: response.data.order_id
      })
    }

    console.log(response.data);
  }

  const handleCEPOriginChange = async (cep)=>{
    if(cep.length === 8){
        setCepOrigin(cep);
        const response = await api.get(`https://brasilapi.com.br/api/cep/v1/${cep}`);
        if(response.data.errors){
          alert('Erro ao procurar o CEP');
          return;
        }
        setAddressOrigin(response.data.street);
        setNeighborhoodOrigin(response.data.neighborhood);
        setCityOrigin(response.data.city);
        setStateOrigin(response.data.state);
    }
  }

  const handleCEPDestinyChange = async (cep)=>{
    if(cep.length === 8){
      setCepDestiny(cep);
      const response = await api.get(`https://brasilapi.com.br/api/cep/v1/${cep}`);
      if(response.data.errors){
        alert('Erro ao procurar o CEP')
        return;
      }
        setAddressDestiny(response.data.street);
        setNeighborhoodDestiny(response.data.neighborhood);
        setCityDestiny(response.data.city);
        setStateDestiny(response.data.state);
      
    }
  }
  return (
    <Form>
      <SubTitle>Formulário de registro do pedido</SubTitle>
      <Label>
        Código do vendedor:
      <Input 
        placeholder="Ex:135321351"
        type="text"
        value={salesmanCode}
        onChange={(e)=>setSalesmanCode(e.target.value)}
        required
      />
      </Label>
      <Label> CNPJ do cliente:
      <Input 
        placeholder="Ex:11295534000109"
        type="text"
        value={CNPJClient}
        onChange={(e)=>setCNPJClient(e.target.value)}
        required
      />
      </Label>
      <Label> Tamanho da carga (Ton):
      <Input 
        placeholder="Ex:10"
        type="number"
        value={loadSize}
        onChange={(e)=>setLoadSize(e.target.value)}
        required
      />
      </Label>
      <Label>Tipo de carga:
      <Select 
        value={loadType}
        onChange={(e)=>setLoadType(e.target.value)}
        required
      >
        <option>Selecione um tipo...</option>
        <option>Frigorífica</option>
        <option>Granel</option>
        <option>Cargas secas</option>
        <option>Cargas perigosas</option>
      </Select>
      </Label>
      <SubTitle>Endereço de origem da carga</SubTitle>
      <Label>CEP:
        <Input 
          placeholder="Ex:12345678"
          onChange={(e)=> handleCEPOriginChange(e.target.value)}
          required
        />
      </Label>
      <Label>Endereço:
        <Input 
          placeholder="Ex:Avenida 1"
          value={addressOrigin}
          onChange={(e)=> setAddressOrigin(e.target.value)}
          required
        />
      </Label>
      <Label>Número:
        <Input 
          placeholder="Ex:100"
          value={numberOrigin}
          onChange={(e)=> setNumberOrigin(e.target.value)}
          required
        />
      </Label>
      <Label>Complemento:
        <Input 
          placeholder="Ex:Doca 2"
          value={complementOrigin}
          onChange={(e)=> setComplementOrigin(e.target.value)}
          required
        />
      </Label>
      <Label>Bairro:
        <Input 
          placeholder="Ex:Barreiro"
          value={neighborhoodOrigin}
          onChange={(e)=> setNeighborhoodOrigin(e.target.value)}
          required
        />
      </Label>
      <Label>Cidade:
        <Input 
          placeholder="Ex:Belo Horizonte"
          value={cityOrigin}
          onChange={(e)=> setCityOrigin(e.target.value)}
          required
        />
      </Label>
      <Label>Estado
        <Select 
          value={stateOrigin}
          onChange={(e)=> setStateOrigin(e.target.value)}
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
      </Label>
      <SubTitle>Endereço de destino da carga</SubTitle>
      <Label>CEP:
        <Input 
          placeholder="CEP..."
          onChange={(e)=> handleCEPDestinyChange(e.target.value)}
          required
        />
      </Label>
      <Label>Endereço:
        <Input 
          placeholder="Endereço..."
          value={addressDestiny}
          onChange={(e)=> setAddressDestiny(e.target.value)}
          required
        />
      </Label>
      <Label>Número:
        <Input 
          placeholder="Número..."
          value={numberDestiny}
          onChange={(e)=> setNumberDestiny(e.target.value)}
          required
        />
      </Label>
      <Label>Complemento:
        <Input 
          placeholder="Complemento..."
          value={complementDestiny}
          onChange={(e)=> setComplementDestiny(e.target.value)}
          required
        />
      </Label>
      <Label>Bairro:
        <Input 
          placeholder="Bairro..."
          value={neighborhoodDestiny}
          onChange={(e)=> setNeighborhoodOrigin(e.target.value)}
          required
        />
      </Label>
      <Label>Cidade:
        <Input 
          placeholder="Cidade..."
          value={cityDestiny}
          onChange={(e)=> setCityDestiny(e.target.value)}
          required
        />
      </Label>
      <Label>Estado
        <Select
         placeholder="Estado..."
         value={stateDestiny}
         onChange={(e)=> setStateDestiny(e.target.value)}
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
      </Label>
      <Button
        onClick={(e) => handleSubmit(e)}
      >Enviar pedido</Button>
    </Form>
  );
}

export default Home;