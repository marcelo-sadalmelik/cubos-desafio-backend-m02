const express = require('express');
const { buscarContas } = require('./controladores/contas');

const rotas = express();

rotas.use('/contas', buscarContas);

module.exports = rotas;
