const express = require('express');
const validaSenha = require('./intermediarios');
const { buscarContas, criarConta } = require('./controladores/contas');

const rotas = express();

rotas.post('/contas', criarConta);

rotas.use(validaSenha);
rotas.get('/contas', buscarContas);

module.exports = rotas;
