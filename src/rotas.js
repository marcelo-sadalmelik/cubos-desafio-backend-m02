const express = require('express');
const validaSenha = require('./intermediarios');
const { buscarContas } = require('./controladores/contas');

const rotas = express();

rotas.use(validaSenha);
rotas.use('/contas', buscarContas);

module.exports = rotas;
