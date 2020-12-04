
const axios = require('axios');
require('../models/database/models/index');
const Order = require('../models/database/models/Orders');
const Invoice = require('../models/mongo/schemas/Invoice');

class OrdersController {
  async show(req,res){
    try{
      const { id_order } = req.params;

      const response = await Order.findByPk(id_order,{raw: true});

      return res.status(200).json(response);

    } catch(e){
      return res.status(500).json({
        message:'Internal server error'
      })
    }
  }
  async create(req,res){
    try{
    let {
      sales_man_code, 
      cnpj_client,
      load_size, 
      load_type,
      cep_origin,
      street_origin,
      number_origin,
      complement_origin, 
      neighborhood_origin,
      city_origin, 
      state_origin,
      cep_destiny,
      street_destiny,
      number_destiny,
      complement_destiny, 
      neighborhood_destiny,
      city_destiny, 
      state_destiny,
    } = req.body;

    let originString = street_origin.replace(' ','+') + '+' +number_origin + '+' +neighborhood_origin.replace(' ','+') + '+' +city_origin.replace(' ','+') + '+' + state_origin;
    let destinyString = street_destiny.replace(' ','+') + '+' +number_destiny + '+' +neighborhood_destiny.replace(' ','+') + '+' +city_destiny.replace(' ','+') + '+' + state_destiny;

    // console.log(originString, destinyString, process.env.GOOGLE_DIRECTION_KEY);

    const url = encodeURI(`https://maps.googleapis.com/maps/api/directions/json?origin=${originString}`+
    `&destination=${destinyString}`+
    `&key=${process.env.GOOGLE_DIRECTION_KEY}`+
    `&language=pt-BR`);

    const responseGoogle = await axios.get(url);


    const trip_distance = responseGoogle.data.routes[0].legs[0].distance.text;
    const trip_duration = responseGoogle.data.routes[0].legs[0].duration.text;
    const price = responseGoogle.data.routes[0].legs[0].distance.value / 100 * 30;

    const responseOrder = await Order.create({
      sales_man_code, 
      cnpj_client,
      load_size, 
      load_type,
      cep_origin,
      street_origin,
      number_origin,
      complement_origin, 
      neighborhood_origin,
      city_origin, 
      state_origin,
      cep_destiny,
      street_destiny,
      number_destiny,
      complement_destiny, 
      neighborhood_destiny,
      city_destiny, 
      state_destiny,
      trip_distance: trip_distance,
      trip_duration: trip_duration,
      price: price,
    });

    let nfe = {
      "id": responseOrder.id,
      "ambienteEmissao": "Producao",
      "naturezaOperacao": "Venda",
      "finalidade": "Normal",
      "consumidorFinal": true,
      "indicadorPresencaConsumidor": "OperacaoPelaInternet",
      "cliente": {
          "tipoPessoa": "J",
          "indicadorContribuinteICMS": "Contribuinte",
          "nome": "Glouton",
          "email": "comercial@glouton.com",
          "telefone": "5531912345678",
          "cpfCnpj": "72143481000103",
          "inscricaoMunicipal": "2328243935990",
          "inscricaoEstadual": "2498580011768",
   
          "endereco": {
              "pais": "Brasil",
              "uf": "MG",
              "cidade": "Belo Horizonte",
              "logradouro": "Rua Bárbara Heliodora",
              "numero": "59",
              "complemento": "",
              "bairro": "Lourdes",
              "cep": "30180130"
          }
      },
      "enviarPorEmail": true,
      "itens": [
          {
              "cfop": "5101",
              "codigo": "1",
              "descricao": "string",
              "ncm": "38151210",
              "quantidade": 1,
              "unidadeMedida": "UN",
              "valorUnitario": price,
   
              "impostos": {
                  "icms": {
                      "situacaoTributaria": "102",
                      "origem": 0 
                  },
                  "pis": {
                      "situacaoTributaria": "07"
                  },
                  "cofins": {
                      "situacaoTributaria": "07"
                  }
              }
          }
      ],
      "transporte": {
          "enderecoEntrega": {
              "tipoPessoaDestinatario": "J",
              "cpfCnpjDestinatario": "72143481000103",
              "pais": "Brasil",
              "uf": state_destiny,
              "cidade": city_destiny,
              "logradouro": street_destiny,
              "numero": number_destiny,
              "complemento": complement_destiny,
              "bairro": neighborhood_destiny,
              "cep": cep_destiny
          },
          "transportadora": {
              "usarDadosEmitente": false,
              "tipoPessoa": "J",
              "CpfCnpj": "42394528000132",
              "nome": "Lebre press LTDA",
              "inscricaoEstadual": "9822805706251",
              "endereco": "Rua Afonso Pena, N 412, Belo Horizonte",
              "cidade": "Belo Horizonte",
              "uf": "MG"
          },
          "veiculo": {
              "placa": "XYZ0000",
              "uf": "MG",
              "rntc": null
          },
          "volume": {
              "quantidade": 1.0000,
              "especie": load_type,
              "marca": null,
              "numeracao": "0",
              "pesoLiquido": load_size,
              "pesoBruto": load_size
          }
      },
      "informacoesAdicionais": "I - Documento emitido por ME ou EPP optante pelo Simples Nacional.\r\n II - Não gera direito a crédito fiscal de ICMS, de ISS e de IPI." //opcional
  }

    nfe = JSON.stringify(nfe);
    
    const responseInvoice = await Invoice.create({
      nfe_json: nfe
    });

    await Order.update({
      nfe_id: String(responseInvoice._id),
    },{
      where: {id: responseOrder.id}
    });

    return res.status(200).json({
      message: 'Pedido criado com sucesso!',
      nfe: responseInvoice._id,
      order_id: responseOrder.id,
    });
    } catch(e){
      console.log(e);
      return res.status(500).json('Internal server error');
    }
  }
}

module.exports = new OrdersController();