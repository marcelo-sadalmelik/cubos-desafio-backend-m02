const bancoDeDados = require('../dados/bancodedados');
const { formatarData } = require('../utilitarios');
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

module.exports = { depositar, sacar };
