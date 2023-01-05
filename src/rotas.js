const express = require('express');
const { validaSenha, validaContaESenha } = require('./intermediarios');
const {
  buscarContas,
  criarConta,
  atualizarConta,
  excluirConta,
  consultarSaldo,
} = require('./controladores/contas');

const rotas = express();

rotas.post('/contas', criarConta);
rotas.put('/contas/:numeroConta/usuario', atualizarConta);
rotas.delete('/contas/:numeroConta', excluirConta);

rotas.get('/contas/saldo', validaContaESenha, consultarSaldo);

rotas.use(validaSenha);
rotas.get('/contas', buscarContas);

module.exports = rotas;
