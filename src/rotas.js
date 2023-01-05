const express = require('express');
const {
  validaSenha,
  validaContaESenha,
  validaDeposito,
  validaSaque,
} = require('./intermediarios');
const {
  buscarContas,
  criarConta,
  atualizarConta,
  excluirConta,
  consultarSaldo,
} = require('./controladores/contas');
const { depositar, sacar } = require('./controladores/transacoes');

const rotas = express();

rotas.post('/contas', criarConta);
rotas.put('/contas/:numeroConta/usuario', atualizarConta);
rotas.delete('/contas/:numeroConta', excluirConta);

rotas.get('/contas/saldo', validaContaESenha, consultarSaldo);

rotas.post('/transacoes/depositar', validaDeposito, depositar);
rotas.post('/transacoes/sacar', validaSaque, sacar);

rotas.use(validaSenha);
rotas.get('/contas', buscarContas);

module.exports = rotas;
