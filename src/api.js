const axios = require('axios')

const api = axios.create({

  baseURL: 'https://central.multicominternet.com.br/webservice/v1/',
    headers:
    {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + new Buffer.from('47:21a5c408c110971f750f0a45f0b3719251eba22963253aee249301c53dc8ae23').toString('base64'),
      ixcsoft: 'listar'
    }
});

module.exports = api;