const axios = require('axios')

const gas = axios.create({

  baseURL: 'https://srv1.ticketlog.com.br/ticketlog-servicos/ebs/veiculo',
    headers:
    {
      'Content-Type': 'application/json',
      Authorization: 'Basic'
    }
});

module.exports = gas;