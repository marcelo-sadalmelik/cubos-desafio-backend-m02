const bancoDeDados = require('../dados/bancodedados');
const { formatarData } = require('../utilitarios');
const depositar = (req, res) => {
  const numero_conta = Number(req.body.numero_conta);
  const valor = Number(req.body.valor);

  const deposito = {
    data: formatarData(new Date()),
    numero_conta,
    valor,
  };

  bancoDeDados.depositos.push(deposito);

  res.status(201).send();
};

module.exports = { depositar };
