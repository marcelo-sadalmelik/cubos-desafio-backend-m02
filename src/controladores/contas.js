const bancoDeDados = require('../dados/bancodedados');
const buscarContas = (req, res) => {
  res.status(200).json(bancoDeDados.contas);
};

module.exports = { buscarContas };
