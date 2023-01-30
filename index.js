const express = require('express')
const server = express();
const api = require('./src/api')
const gas = require('./src/gas')
const cors = require('cors');


server.use(express.json());

const corsoption = {
    origin: '*',
    optionsSuccessStatus: 200
}

server.use(cors(corsoption))

server.get("/gasolina", async (req, res) => {
    try{

        const { data } = await gas.get('/')

        return res.send({ dados: data })
    }catch(error){
        res.send({ error: error.message });
    }
})

server.get("/fn_apagar/:data_inicio/:data_fim", async (req, res) => {
    try{

        const { data } = await api.get('/fn_apagar', {
            data:
            {
                qtype: "fn_apagar.id",
                query:"",
                oper:"=",
                page:"1",
                rp:"5000",
                sortname:"fn_apagar.id",
                sortorder:"desc",
                grid_param : `[{\"TB\":\"fn_apagar.data_pagamento\", \"OP\" : \">=\", \"P\" : \"${req.params.data_inicio} 00:00:00\"},{\"TB\":\"fn_apagar.data_pagamento\", \"OP\" : \"<=\", \"P\" : \"${req.params.data_fim} 23:59:59\"}]`  
            }
        })

        return res.send({ dados: data })
    }catch(error){
        res.send({ error: error.message });
    }
})

server.get("/fn_areceber/:data_inicio/:data_fim", async (req, res) => {
    try{

        const { data } = await api.get('/fn_areceber', {
            data:
            {
                qtype:"fn_areceber.Status",
                query:"A",
                oper:"=",
                page:"1",
                rp:"50000",
                sortname:"fn_areceber.id",
                sortorder:"desc",
                grid_param : `[{\"TB\":\"fn_areceber.data_vencimento\", \"OP\" : \">=\", \"P\" : \"${req.params.data_inicio}\"},{\"TB\":\"fn_areceber.data_vencimento\", \"OP\" : \"<=\", \"P\" : \"${req.params.data_fim}\"},{\"TB\":\"fn_areceber.liberado\", \"OP\" : \"=\", \"P\" : \"S\"}]` 
            }
        })

        return res.send({ dados: data })
    }catch(error){
        res.send({ error: error.message });
    }
})

server.get("/fn_recebido/:data_inicio/:data_fim", async (req, res) => {
    try{

        const { data } = await api.get('/fn_areceber', {
            data:
            {
                qtype: 'fn_areceber.id',
                query: '0',
                oper: '>',
                page: '1',
                rp: '100000',
                sortname: 'fn_areceber.id',
                sortorder: 'desc',
                grid_param : `[{\"TB\":\"fn_areceber.pagamento_data\", \"OP\" : \">=\", \"P\" : \"${req.params.data_inicio}\"},{\"TB\":\"fn_areceber.pagamento_data\", \"OP\" : \"<=\", \"P\" : \"${req.params.data_fim}\"},{\"TB\":\"fn_areceber.liberado\", \"OP\" : \"=\", \"P\" : \"S\"}]` 
            
            }
        })

        return res.send({ dados: data })
    }catch(error){
        res.send({ error: error.message });
    }
})

server.get("/fn_faturamento/:data_inicio/:data_fim", async (req, res) => {
    try{

        const { data } = await api.get('/fn_areceber', {
            data:
            {
                qtype: 'fn_areceber.id',
                query: '0',
                oper: '>',
                page: '1',
                rp: '100000',
                sortname: 'fn_areceber.id',
                sortorder: 'desc',
                grid_param : `[{\"TB\":\"fn_areceber.data_vencimento\", \"OP\" : \">=\", \"P\" : \"${req.params.data_inicio}\"},{\"TB\":\"fn_areceber.data_vencimento\", \"OP\" : \"<=\", \"P\" : \"${req.params.data_fim}\"},{\"TB\":\"fn_areceber.liberado\", \"OP\" : \"=\", \"P\" : \"S\"}]` 
            }
        })

        return res.send({ dados: data })
    }catch(error){
        res.send({ error: error.message });
    }
})

server.get("/fn_recebido2/:data_inicio/:data_fim", async (req, res) => {
    try{

        const { data } = await api.get('/fn_areceber_baixas', {
            data:
            {
                qtype : 'fn_movim_finan.id',
                query : '1',
                oper : '>=',
                page : '1',
                rp : '500000',
                sortname : 'fn_movim_finan.id',
                sortorder : 'desc',
                grid_param : `[{\"TB\":\"fn_movim_finan.data\", \"OP\" : \">=\", \"P\" : \"${req.params.data_inicio}\"},{\"TB\":\"fn_movim_finan.data\", \"OP\" : \"<=\", \"P\" : \"${req.params.data_fim}\"},{\"TB\":\"fn_movim_finan.credito\", \"OP\" : \">\", \"P\" : \"0\"}]`
            },
        })

        return res.send({ dados: data })
    }catch(error){
        res.send({ error: error.message });
    }
})

server.get("/contas", async (req, res) => {
    try{

        const { data } = await api.get('/contas', {
            data:
            {
                qtype : 'contas.id',
                query : '1',
                oper : '>=',
                page : '1',
                rp : '500000',
                sortname : 'contas.id',
                sortorder : 'desc',
            },
        })

        return res.send({ dados: data })
    }catch(error){
        res.send({ error: error.message });
    }
})

server.get("/fornecedor", async (req, res) => {
    try{

        const { data } = await api.get('/fornecedor', {
            data:
            {
                qtype : 'fornecedor.id',
                query : '1',
                oper : '>=',
                page : '1',
                rp : '500000',
                sortname : 'fornecedor.id',
                sortorder : 'desc',
            },
        })

        return res.send({ dados: data })
        
    }catch(error){
        res.send({ error: error.message });
    }
})

server.get("/planejamento_analitico", async (req, res) => {
    try{

        const { data } = await api.get('/planejamento_analitico', {
            data:
            {
                qtype : 'planejamento_analitico.id',
                query : '1',
                oper : '>=',
                page : '1',
                rp : '500000',
                sortname : 'planejamento_analitico.id',
                sortorder : 'desc',
            },
        })

        return res.send({ dados: data })

    }catch(error){
        res.send({ error: error.message });
    }
})

server.get("/cliente", async (req, res) => {
    try{

        const { data } = await api.get('/cliente', {
            data:
            {
                qtype : 'cliente.id',
                query : '1',
                oper : '>=',
                page : '1',
                rp : '500000',
                sortname : 'cliente.id',
                sortorder : 'desc',
            },
        })

        return res.send({ dados: data })

    }catch(error){
        res.send({ error: error.message });
    }
})

server.get("/fn_carteira_cobranca", async (req, res) => {
    try{

        const { data } = await api.get('/fn_carteira_cobranca', {
            data:
            {
                qtype : 'fn_carteira_cobranca.id',
                query : '1',
                oper : '>=',
                page : '1',
                rp : '500000',
                sortname : 'fn_carteira_cobranca.id',
                sortorder : 'desc',
            },
        })

        return res.send({ dados: data })

    }catch(error){
        res.send({ error: error.message });
    }
})

server.get("/cliente_contrato", async (req, res) => {
    try{

        const { data } = await api.get('/cliente_contrato', {
            data:
            {
                qtype: 'cliente_contrato.id',
                query: '0',
                oper: '>',
                page: '1',
                rp: '20000',
                sortname: 'cliente_contrato.id',
                sortorder: 'desc'
            },
        })

        return res.send({ dados: data })

    }catch(error){
        res.send({ error: error.message });
    }
})

server.get("/vd_contratos", async (req, res) => {
    try{

        const { data } = await api.get('/vd_contratos', {
            data:
            {
                qtype: 'vd_contratos.id',
                query: '0',
                oper: '>',
                page: '1',
                rp: '20',
                sortname: 'vd_contratos.id',
                sortorder: 'desc'
            },
        })

        return res.send({ dados: data })

    }catch(error){
        res.send({ error: error.message });
    }
})

server.listen(8000);