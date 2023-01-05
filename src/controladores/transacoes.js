const bancoDeDados = require('../dados/bancodedados');
const { formatarData, buscarConta } = require('../utilitarios');
const depositar = (req, res) => {
  const numero_conta = Number(req.body.numero_conta);
  const valor = Number(req.body.valor);

  const conta = bancoDeDados.contas.find(
    (conta) => conta.numero === numero_conta,
  );

  const deposito = {
    data: formatarData(new Date()),
    numero_conta,
    valor,
  };

  bancoDeDados.depositos.push(deposito);
  conta.saldo += valor;

  res.status(201).send();
};

const sacar = (req, res) => {
  const numero_conta = Number(req.body.numero_conta);
  const valor = Number(req.body.valor);

  const conta = bancoDeDados.contas.find(
    (conta) => conta.numero === numero_conta,
  );

  const saque = {
    data: formatarData(new Date()),
    numero_conta,
    valor,
  };

  bancoDeDados.saques.push(saque);
  conta.saldo -= valor;

  return res.status(200).send();
};

const transferir = (req, res) => {
  const numero_conta_origem = Number(req.body.numero_conta_origem);
  const numero_conta_destino = Number(req.body.numero_conta_destino);
  const valor = Number(req.body.valor);

  const contaOrigem = buscarConta(numero_conta_origem, bancoDeDados.contas);
  const contaDestino = buscarConta(numero_conta_destino, bancoDeDados.contas);

  const transferencia = {
    data: formatarData(new Date()),
    numero_conta_origem,
    numero_conta_destino,
    valor,
  };

  bancoDeDados.transferencias.push(transferencia);
  contaOrigem.saldo -= valor;
  contaDestino.saldo += valor;

  return res.status(201).send();
};

module.exports = { depositar, sacar, transferir };
