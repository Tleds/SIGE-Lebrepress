import React, { useEffect, useState} from 'react';

import api from '../../services/api';

function OrdersDetails(props) {
  const [tripDuration, setTripDuration] = useState('');
  const [tripDistance, setTripDistance] = useState('');
  const [tripPrice, setTripPrice] = useState('');
  const [nfeId, setNfeId] = useState('');

  useEffect(()=>{
    async function loadData(){
      
      const response = await api.get(`/orders/${props.location.state.id_order}`,{
        headers:{
          authentication: `Bearer ${localStorage.getItem('token')}`
        },
        validateStatus: false,
      });
      setTripDistance(response.data.trip_distance);
      setTripDuration(response.data.trip_duration);
      setTripPrice(response.data.price);
      setNfeId(response.data.nfe_id);
    }
    loadData();
  },[])

  return (
    <>
      <h1>Pedido confirmado!</h1>

      <p>Distância total: {tripDistance}</p>
      <p>Tempo estimado: {tripDuration}</p>
      <p>Preço total: R$ {Math.round(tripPrice)}</p>
      <p>Identificador da NFe: {nfeId}</p>
    </>
  );
}

export default OrdersDetails;