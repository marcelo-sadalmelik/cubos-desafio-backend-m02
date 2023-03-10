const express = require('express');
const {
  validaSenha,
  validaContaESenha,
  validaDeposito,
  validaSaque,
  validaTransferencia,
} = require('./intermediarios');
const {
  buscarContas,
  criarConta,
  atualizarConta,
  excluirConta,
  consultarSaldo,
  consultarExtrato,
} = require('./controladores/contas');
const { depositar, sacar, transferir } = require('./controladores/transacoes');

const rotas = express();

rotas.post('/contas', criarConta);
rotas.put('/contas/:numeroConta/usuario', atualizarConta);
rotas.delete('/contas/:numeroConta', excluirConta);

rotas.get('/contas/saldo', validaContaESenha, consultarSaldo);
rotas.get('/contas/extrato', validaContaESenha, consultarExtrato);

rotas.post('/transacoes/depositar', validaDeposito, depositar);
rotas.post('/transacoes/sacar', validaSaque, sacar);
rotas.post('/transacoes/transferir', validaTransferencia, transferir);

rotas.use(validaSenha);
rotas.get('/contas', buscarContas);

module.exports = rotas;
