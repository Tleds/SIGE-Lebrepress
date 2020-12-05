import React,{useEffect, useState} from 'react';
import NumberFormat from 'react-number-format';

import api from '../../services/api';

import { 
  Container,
  Title,
  Table,
  Head,
  HeadItem,
  Body,
  BodyItem,
  Button
} from './styles';

function UserArea(props) {
  const [orders,setOrders] = useState([{}])
  useEffect(()=>{
    async function loadOrders(){
      const response = await api.get('/all_orders',{
        headers:{
          authentication: `Bearer ${localStorage.getItem('token')}`,
        },
        validateStatus: false,
      });
      setOrders(response.data.order);
    }
    loadOrders();
  },[])
  return (
    <Container>
      <Title>Lebrepress - Lista de pedidos</Title>
      <Table>
        <Head>
          <HeadItem>NFE</HeadItem>
          <HeadItem>Distância</HeadItem>
          <HeadItem>Duração</HeadItem>
          <HeadItem>Tamanho da carga</HeadItem>
          <HeadItem>Tipo da carga</HeadItem>
          <HeadItem>Preço</HeadItem>
        </Head>
        {console.log(orders)}
        {orders !== undefined ? orders.map(order=>(<>
          <Body>
            <BodyItem>{order.nfe_id}</BodyItem>
            <BodyItem>{order.trip_distance}</BodyItem>
            <BodyItem>{order.trip_duration}</BodyItem>
            <BodyItem>{order.load_size}</BodyItem>
            <BodyItem>{order.load_type}</BodyItem>
            <BodyItem>
              <NumberFormat value={order.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />  
            </BodyItem>
          </Body>
        </>)): (
        <>
        <Body>
          <BodyItem>Você ainda não possui pedidos</BodyItem>
        </Body>
        </>
        )}
      </Table>
      <Button
        onClick={()=> props.history.push('/order')}
      >Fazer pedido</Button>
    </Container>
  );
}

export default UserArea;