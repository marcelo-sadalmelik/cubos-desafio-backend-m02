const express = require('express');
const validaSenha = require('./intermediarios');
const {
  buscarContas,
  criarConta,
  atualizarConta,
  excluirConta,
} = require('./controladores/contas');

const rotas = express();

rotas.post('/contas', criarConta);
rotas.put('/contas/:numeroConta/usuario', atualizarConta);
rotas.delete('/contas/:numeroConta', excluirConta);

rotas.use(validaSenha);
rotas.get('/contas', buscarContas);

module.exports = rotas;
